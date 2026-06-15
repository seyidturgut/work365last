import crypto from "node:crypto";

export type PaytrConfig = {
  merchantId: string;
  merchantKey: string;
  merchantSalt: string;
  testMode: string;
};

export function getPaytrConfig(): PaytrConfig {
  return {
    merchantId: process.env.PAYTR_MERCHANT_ID || "",
    merchantKey: process.env.PAYTR_MERCHANT_KEY || "",
    merchantSalt: process.env.PAYTR_MERCHANT_SALT || "",
    testMode: process.env.PAYTR_TEST_MODE || "1",
  };
}

export function isPaytrConfigured(cfg = getPaytrConfig()): boolean {
  return Boolean(cfg.merchantId && cfg.merchantKey && cfg.merchantSalt);
}

function hmacBase64(data: string, key: string): string {
  return crypto.createHmac("sha256", key).update(data).digest("base64");
}

export type BasketItem = [string, string, number]; // [ad, birimFiyatTL, adet]

export type TokenInput = {
  merchantOid: string;
  email: string;
  paymentAmountKurus: number; // tam sayı kuruş
  userIp: string;
  basket: BasketItem[];
  okUrl: string;
  failUrl: string;
  recurring?: boolean; // aylık abonelik → kartı sakla
  userName?: string;
  userAddress?: string;
  userPhone?: string;
  noInstallment?: string; // "0"
  maxInstallment?: string; // "0"
  currency?: string; // "TL"
};

/**
 * PayTR iFrame API get-token isteği için form alanlarını üretir.
 * Dönen objedeki tüm alanlar application/x-www-form-urlencoded olarak gönderilir.
 */
export function buildPaytrTokenRequest(input: TokenInput): Record<string, string> {
  const cfg = getPaytrConfig();
  const noInstallment = input.noInstallment ?? "0";
  const maxInstallment = input.maxInstallment ?? "0";
  const currency = input.currency ?? "TL";
  const userBasket = Buffer.from(JSON.stringify(input.basket)).toString("base64");
  const paymentAmount = String(Math.round(input.paymentAmountKurus));

  const hashStr =
    cfg.merchantId +
    input.userIp +
    input.merchantOid +
    input.email +
    paymentAmount +
    userBasket +
    noInstallment +
    maxInstallment +
    currency +
    cfg.testMode;

  const paytrToken = hmacBase64(hashStr + cfg.merchantSalt, cfg.merchantKey);

  return {
    merchant_id: cfg.merchantId,
    user_ip: input.userIp,
    merchant_oid: input.merchantOid,
    email: input.email,
    payment_amount: paymentAmount,
    paytr_token: paytrToken,
    user_basket: userBasket,
    debug_on: cfg.testMode === "1" ? "1" : "0",
    no_installment: noInstallment,
    max_installment: maxInstallment,
    user_name: input.userName ?? "",
    user_address: input.userAddress ?? "",
    user_phone: input.userPhone ?? "",
    merchant_ok_url: input.okUrl,
    merchant_fail_url: input.failUrl,
    timeout_limit: "30",
    currency,
    test_mode: cfg.testMode,
    // Aylık abonelikte kartı tekrarlı ödeme için sakla (hash'e dahil DEĞİL).
    recurring_payment: input.recurring ? "1" : "0",
  };
}

/** PayTR'den get-token çağrısı; başarıda token döner. */
export async function fetchPaytrToken(fields: Record<string, string>): Promise<string> {
  const body = new URLSearchParams(fields);
  const res = await fetch("https://www.paytr.com/odeme/api/get-token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  const data = (await res.json()) as { status: string; token?: string; reason?: string };
  if (data.status !== "success" || !data.token) {
    throw new Error(`PayTR token alınamadı: ${data.reason || "bilinmeyen hata"}`);
  }
  return data.token;
}

/** Callback (bildirim) hash doğrulaması. */
export function verifyCallbackHash(params: {
  merchantOid: string;
  status: string;
  totalAmount: string;
  hash: string;
}): boolean {
  const cfg = getPaytrConfig();
  const expected = hmacBase64(
    params.merchantOid + cfg.merchantSalt + params.status + params.totalAmount,
    cfg.merchantKey
  );
  return expected === params.hash;
}

export type RecurringChargeResult = {
  ok: boolean;
  status: string; // 'success' | 'failed' | 'not_configured' | 'error'
  reason?: string;
  raw?: unknown;
};

/**
 * Saklı kart ile tekrarlı (recurring) tahsilat — cron tarafından çağrılır.
 *
 * NOT: PayTR "Tekrarlayan Ödeme" mağaza hesabında AYRICA aktive edilmelidir.
 * Aşağıdaki istek, PayTR recurring (capi) çağrısını modeller; aktivasyon sonrası
 * PayTR'nin verdiği nihai endpoint/alan adları ile teyit edilmelidir.
 */
export async function chargeRecurring(input: {
  merchantOid: string;
  email: string;
  amountKurus: number;
  userIp: string;
  recurringToken: string | null;
}): Promise<RecurringChargeResult> {
  const cfg = getPaytrConfig();
  if (!isPaytrConfigured()) {
    return { ok: false, status: "not_configured", reason: "PayTR mağaza bilgileri tanımlı değil." };
  }

  const paymentAmount = String(Math.round(input.amountKurus));
  // Hash deseni PayTR çağrılarıyla tutarlı (merchant_salt+merchant_key ile HMAC).
  const hashStr = cfg.merchantId + input.merchantOid + paymentAmount + cfg.testMode;
  const paytrToken = hmacBase64(hashStr + cfg.merchantSalt, cfg.merchantKey);

  const fields: Record<string, string> = {
    merchant_id: cfg.merchantId,
    merchant_oid: input.merchantOid,
    email: input.email,
    payment_amount: paymentAmount,
    currency: "TL",
    test_mode: cfg.testMode,
    recurring_token: input.recurringToken ?? "",
    user_ip: input.userIp,
    paytr_token: paytrToken,
  };

  try {
    const res = await fetch("https://www.paytr.com/odeme/capi/recurring", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(fields).toString(),
    });
    const data = (await res.json()) as { status?: string; reason?: string; err_msg?: string };
    const ok = data.status === "success";
    return {
      ok,
      status: ok ? "success" : "failed",
      reason: data.reason || data.err_msg,
      raw: data,
    };
  } catch (error) {
    return { ok: false, status: "error", reason: error instanceof Error ? error.message : "İstek hatası" };
  }
}
