import {
  getFirstOrderItem,
  getOrderByMerchantOid,
  markOrderFailed,
  markOrderPaid,
  recordPaymentEvent,
} from "@/lib/order-store";
import { createSubscriptionFromOrder } from "@/lib/subscription-store";
import { verifyCallbackHash } from "@/lib/paytr";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// PayTR sunucudan-sunucuya bildirim (POST, application/x-www-form-urlencoded).
// Her durumda gövdede düz metin "OK" dönülmeli (PayTR şartı).
export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const merchantOid = String(form.get("merchant_oid") ?? "");
    const status = String(form.get("status") ?? "");
    const totalAmount = String(form.get("total_amount") ?? "");
    const hash = String(form.get("hash") ?? "");

    const hashValid = verifyCallbackHash({ merchantOid, status, totalAmount, hash });

    const order = merchantOid ? await getOrderByMerchantOid(merchantOid) : null;

    const raw: Record<string, string> = {};
    form.forEach((value, key) => {
      raw[key] = typeof value === "string" ? value : "[file]";
    });

    await recordPaymentEvent({
      orderId: order ? Number(order.id) : null,
      merchantOid,
      status,
      totalAmountKurus: totalAmount ? Number(totalAmount) : null,
      hashValid,
      raw,
    });

    if (!hashValid) {
      return new Response("PAYTR notification failed: bad hash", { status: 200 });
    }

    if (status === "success") {
      await markOrderPaid(merchantOid);

      // Aylık ürünse aboneliği başlat (sonraki çekim +1 ay).
      if (order && Number(order.is_recurring) === 1) {
        const item = await getFirstOrderItem(Number(order.id));
        if (item) {
          const recurringToken =
            (raw["recurring_token"] as string) || (raw["card_token"] as string) || null;
          await createSubscriptionFromOrder({
            userId: Number(order.user_id),
            sku: item.sku,
            title: item.title,
            amountKurus: item.unitPriceKurus * item.qty,
            originalOrderId: Number(order.id),
            recurringToken,
          });
        }
      }
    } else {
      const reason = String(form.get("failed_reason_msg") ?? "Ödeme başarısız");
      await markOrderFailed(merchantOid, reason);
    }

    return new Response("OK", { status: 200 });
  } catch {
    // Hata olsa bile PayTR tekrar denemesin diye OK döneriz; olay kaydı yukarıda tutulur.
    return new Response("OK", { status: 200 });
  }
}
