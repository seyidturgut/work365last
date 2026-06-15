import { execute, query, queryOne } from "@/lib/db";
import type { RowDataPacket } from "mysql2";

const MAX_FAILS = 3;

export function addMonths(date: Date, months: number): Date {
  const d = new Date(date.getTime());
  d.setMonth(d.getMonth() + months);
  return d;
}

export type SubscriptionView = {
  id: number;
  title: string;
  sku: string;
  amountKurus: number;
  status: string;
  nextChargeAt: string | null;
  lastChargeAt: string | null;
  createdAt: string;
};

export type DueSubscription = {
  id: number;
  userId: number;
  email: string;
  sku: string;
  title: string;
  amountKurus: number;
  recurringToken: string | null;
  failCount: number;
};

/** İlk ödeme başarılı olunca aboneliği oluşturur (idempotent: aynı order için tek kez). */
export async function createSubscriptionFromOrder(input: {
  userId: number;
  sku: string;
  title: string;
  amountKurus: number;
  originalOrderId: number;
  recurringToken: string | null;
}): Promise<void> {
  const existing = await queryOne<RowDataPacket & { id: number }>(
    "SELECT id FROM subscriptions WHERE original_order_id = ? LIMIT 1",
    [input.originalOrderId]
  );
  if (existing) return;

  const nextCharge = addMonths(new Date(), 1);
  await execute(
    `INSERT INTO subscriptions
      (user_id, product_sku, title, amount_kurus, interval_unit, status,
       original_order_id, paytr_recurring_token, next_charge_at)
     VALUES (?, ?, ?, ?, 'monthly', 'active', ?, ?, ?)`,
    [
      input.userId,
      input.sku,
      input.title,
      input.amountKurus,
      input.originalOrderId,
      input.recurringToken,
      nextCharge,
    ]
  );
}

export async function listByUser(userId: number): Promise<SubscriptionView[]> {
  const rows = await query<(RowDataPacket & {
    id: number;
    title: string;
    product_sku: string;
    amount_kurus: number;
    status: string;
    next_charge_at: string | null;
    last_charge_at: string | null;
    created_at: string;
  })[]>(
    `SELECT id, title, product_sku, amount_kurus, status, next_charge_at, last_charge_at, created_at
     FROM subscriptions WHERE user_id = ? ORDER BY id DESC`,
    [userId]
  );
  const iso = (v: string | null) =>
    v ? (typeof v === "string" ? v : new Date(v).toISOString()) : null;
  return rows.map((r) => ({
    id: Number(r.id),
    title: r.title,
    sku: r.product_sku,
    amountKurus: Number(r.amount_kurus),
    status: r.status,
    nextChargeAt: iso(r.next_charge_at),
    lastChargeAt: iso(r.last_charge_at),
    createdAt: iso(r.created_at) ?? "",
  }));
}

/** Kullanıcı kendi aboneliğini iptal eder. */
export async function cancelSubscription(subscriptionId: number, userId: number): Promise<boolean> {
  const result = await execute(
    "UPDATE subscriptions SET status = 'canceled', canceled_at = NOW() WHERE id = ? AND user_id = ? AND status IN ('active','past_due')",
    [subscriptionId, userId]
  );
  return result.affectedRows > 0;
}

/** Vadesi gelmiş aktif abonelikler (cron için). */
export async function getDueSubscriptions(limit = 100): Promise<DueSubscription[]> {
  const rows = await query<(RowDataPacket & {
    id: number;
    user_id: number;
    email: string;
    product_sku: string;
    title: string;
    amount_kurus: number;
    paytr_recurring_token: string | null;
    fail_count: number;
  })[]>(
    `SELECT s.id, s.user_id, u.email, s.product_sku, s.title, s.amount_kurus,
            s.paytr_recurring_token, s.fail_count
     FROM subscriptions s
     JOIN users u ON u.id = s.user_id
     WHERE s.status = 'active' AND s.next_charge_at <= NOW()
     ORDER BY s.next_charge_at ASC
     LIMIT ${Math.max(1, Math.min(500, limit))}`
  );
  return rows.map((r) => ({
    id: Number(r.id),
    userId: Number(r.user_id),
    email: r.email,
    sku: r.product_sku,
    title: r.title,
    amountKurus: Number(r.amount_kurus),
    recurringToken: r.paytr_recurring_token,
    failCount: Number(r.fail_count),
  }));
}

export async function recordSubscriptionCharge(input: {
  subscriptionId: number;
  orderId: number | null;
  merchantOid: string;
  status: string;
  amountKurus: number | null;
}): Promise<void> {
  await execute(
    `INSERT INTO subscription_charges (subscription_id, order_id, merchant_oid, status, amount_kurus)
     VALUES (?, ?, ?, ?, ?)`,
    [input.subscriptionId, input.orderId, input.merchantOid, input.status, input.amountKurus]
  );
}

/** Başarılı çekim: sonraki tarihi +1 ay ileri al, fail_count sıfırla. */
export async function advanceAfterSuccess(subscriptionId: number): Promise<void> {
  const next = addMonths(new Date(), 1);
  await execute(
    "UPDATE subscriptions SET last_charge_at = NOW(), next_charge_at = ?, fail_count = 0, status = 'active' WHERE id = ?",
    [next, subscriptionId]
  );
}

/** Başarısız çekim: fail_count++ ; MAX_FAILS'e ulaşınca past_due. */
export async function markChargeFailed(subscriptionId: number, currentFailCount: number): Promise<void> {
  const next = currentFailCount + 1;
  if (next >= MAX_FAILS) {
    await execute(
      "UPDATE subscriptions SET fail_count = ?, status = 'past_due' WHERE id = ?",
      [next, subscriptionId]
    );
  } else {
    // 1 gün sonra tekrar dene
    const retryAt = new Date();
    retryAt.setDate(retryAt.getDate() + 1);
    await execute(
      "UPDATE subscriptions SET fail_count = ?, next_charge_at = ? WHERE id = ?",
      [next, retryAt, subscriptionId]
    );
  }
}
