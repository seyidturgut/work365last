import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { createSingleOrder, saveOrderToken, type Billing } from "@/lib/order-store";
import { getCatalogProduct } from "@/lib/catalog";
import {
  buildPaytrTokenRequest,
  fetchPaytrToken,
  getPaytrConfig,
  isPaytrConfigured,
} from "@/lib/paytr";

export const runtime = "nodejs";

type CheckoutPayload = {
  sku?: string;
  billing?: Partial<Billing>;
  consents?: { mesafeli?: boolean; onBilgi?: boolean; abonelik?: boolean };
};

function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "127.0.0.1";
}

function getBaseUrl(request: Request): string {
  const fromEnv = process.env.APP_BASE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return new URL(request.url).origin;
}

function validateBilling(raw: Partial<Billing> | undefined): { ok: true; billing: Billing } | { ok: false; error: string } {
  const type = raw?.type === "corporate" ? "corporate" : raw?.type === "individual" ? "individual" : null;
  if (!type) return { ok: false, error: "Fatura tipi seçin." };

  const billing: Billing = {
    type,
    name: (raw?.name ?? "").trim(),
    tckn: (raw?.tckn ?? "").trim(),
    company: (raw?.company ?? "").trim(),
    vkn: (raw?.vkn ?? "").trim(),
    taxOffice: (raw?.taxOffice ?? "").trim(),
    address: (raw?.address ?? "").trim(),
    city: (raw?.city ?? "").trim(),
    phone: (raw?.phone ?? "").trim(),
  };

  if (!billing.address || !billing.city || !billing.phone) {
    return { ok: false, error: "Adres, şehir ve telefon zorunludur." };
  }
  if (type === "individual") {
    if (!billing.name) return { ok: false, error: "Ad soyad zorunludur." };
    if (billing.tckn.replace(/\D/g, "").length !== 11) {
      return { ok: false, error: "Geçerli bir TC kimlik numarası girin." };
    }
  } else {
    if (!billing.company) return { ok: false, error: "Firma ünvanı zorunludur." };
    if (!billing.vkn) return { ok: false, error: "Vergi numarası zorunludur." };
    if (!billing.taxOffice) return { ok: false, error: "Vergi dairesi zorunludur." };
    if (!billing.name) billing.name = billing.company;
  }
  return { ok: true, billing };
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Önce giriş yapın." }, { status: 401 });
    }

    const body = (await request.json()) as CheckoutPayload;
    const sku = String(body.sku ?? "").trim();
    const product = getCatalogProduct(sku);
    if (!product) {
      return NextResponse.json({ error: "Geçersiz ürün." }, { status: 400 });
    }
    const isRecurring = product.term === "monthly";

    const billingResult = validateBilling(body.billing);
    if (!billingResult.ok) {
      return NextResponse.json({ error: billingResult.error }, { status: 400 });
    }

    // Sözleşme onayları
    const c = body.consents ?? {};
    if (!c.mesafeli || !c.onBilgi) {
      return NextResponse.json(
        { error: "Mesafeli Satış Sözleşmesi ve Ön Bilgilendirme Formu onaylanmalı." },
        { status: 400 }
      );
    }
    if (isRecurring && !c.abonelik) {
      return NextResponse.json(
        { error: "Aylık otomatik yenileme için abonelik onayı gereklidir." },
        { status: 400 }
      );
    }

    const consents = {
      mesafeli: true,
      onBilgi: true,
      abonelik: Boolean(c.abonelik),
      acceptedAt: new Date().toISOString(),
      ip: getClientIp(request),
      version: "2026-06",
    };

    // Siparişi oluştur (fiyat DB'den doğrulanır)
    const order = await createSingleOrder({
      userId: user.id,
      email: user.email,
      sku,
      qty: 1,
      billing: billingResult.billing,
      consents,
    });

    if (!isPaytrConfigured()) {
      return NextResponse.json(
        {
          error: "PayTR mağaza bilgileri tanımlı değil. .env.local içine PAYTR_MERCHANT_ID/KEY/SALT girin.",
          merchantOid: order.merchantOid,
        },
        { status: 503 }
      );
    }

    const baseUrl = getBaseUrl(request);
    const fields = buildPaytrTokenRequest({
      merchantOid: order.merchantOid,
      email: user.email,
      paymentAmountKurus: order.totalKurus,
      userIp: getClientIp(request),
      basket: order.basket,
      recurring: order.isRecurring,
      userName: billingResult.billing.name,
      userAddress: billingResult.billing.address,
      userPhone: billingResult.billing.phone,
      okUrl: `${baseUrl}/odeme/sonuc?status=success&oid=${order.merchantOid}`,
      failUrl: `${baseUrl}/odeme/sonuc?status=fail&oid=${order.merchantOid}`,
    });

    const token = await fetchPaytrToken(fields);
    await saveOrderToken(order.orderId, token);

    return NextResponse.json({
      ok: true,
      token,
      merchantOid: order.merchantOid,
      iframeUrl: `https://www.paytr.com/odeme/guzelhesap/${token}`,
      recurring: order.isRecurring,
      testMode: getPaytrConfig().testMode === "1",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ödeme başlatılamadı.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
