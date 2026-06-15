import crypto from "node:crypto";
import { execute, getPool, query, queryOne } from "@/lib/db";
import type { RowDataPacket } from "mysql2";
import type { BasketItem } from "@/lib/paytr";

export type Billing = {
  type: "individual" | "corporate";
  name: string;
  tckn: string;
  company: string;
  vkn: string;
  taxOffice: string;
  address: string;
  city: string;
  phone: string;
};

export type CreatedOrder = {
  orderId: number;
  merchantOid: string;
  totalKurus: number;
  basket: BasketItem[];
  title: string;
  sku: string;
  isRecurring: boolean;
};

type ProductRow = RowDataPacket & {
  id: number;
  sku: string;
  title: string;
  price_kurus: number;
  term: string;
};

function genMerchantOid(userId: number): string {
  const rand = crypto.randomBytes(4).toString("hex");
  // sadece alfanumerik (PayTR şartı)
  return `WO${Date.now().toString(36)}${userId}${rand}`.replace(/[^a-zA-Z0-9]/g, "");
}

/**
 * Tek ürünlü "Satın Al" siparişi oluşturur. Fiyat ve term DB'den doğrulanır.
 * term='monthly' ise sipariş is_recurring=1 işaretlenir (abonelik).
 */
export async function createSingleOrder(input: {
  userId: number;
  email: string;
  sku: string;
  qty?: number;
  billing: Billing;
  consents: Record<string, unknown>;
}): Promise<CreatedOrder> {
  const sku = String(input.sku || "").trim();
  const qty = Math.max(1, Math.min(20, Number(input.qty) || 1));
  if (!sku) throw new Error("Ürün seçilmedi.");

  const product = await queryOne<ProductRow>(
    "SELECT id, sku, title, price_kurus, term FROM products WHERE active = 1 AND sku = ? LIMIT 1",
    [sku]
  );
  if (!product) throw new Error(`Ürün bulunamadı veya satışta değil: ${sku}`);

  const unitPriceKurus = Number(product.price_kurus);
  const totalKurus = unitPriceKurus * qty;
  if (totalKurus <= 0) throw new Error("Geçersiz tutar.");

  const isRecurring = product.term === "monthly";
  const merchantOid = genMerchantOid(input.userId);
  const basket: BasketItem[] = [[product.title, (unitPriceKurus / 100).toFixed(2), qty]];
  const b = input.billing;

  const conn = await getPool().getConnection();
  try {
    await conn.beginTransaction();
    const [orderResult] = await conn.execute(
      `INSERT INTO orders
        (user_id, merchant_oid, status, total_kurus, currency, email, is_recurring,
         billing_type, billing_name, billing_tckn, billing_company, billing_vkn,
         billing_tax_office, billing_address, billing_city, billing_phone, consents)
       VALUES (?, ?, 'pending', ?, 'TL', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        input.userId,
        merchantOid,
        totalKurus,
        input.email,
        isRecurring ? 1 : 0,
        b.type,
        b.name,
        b.tckn,
        b.company,
        b.vkn,
        b.taxOffice,
        b.address,
        b.city,
        b.phone,
        JSON.stringify(input.consents ?? {}),
      ]
    );
    const orderId = Number((orderResult as { insertId: number }).insertId);

    await conn.execute(
      `INSERT INTO order_items (order_id, product_id, sku, title, unit_price_kurus, qty)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [orderId, Number(product.id), product.sku, product.title, unitPriceKurus, qty]
    );
    await conn.commit();
    return {
      orderId,
      merchantOid,
      totalKurus,
      basket,
      title: product.title,
      sku: product.sku,
      isRecurring,
    };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export async function saveOrderToken(orderId: number, token: string): Promise<void> {
  await execute("UPDATE orders SET paytr_token = ? WHERE id = ?", [token, orderId]);
}

type OrderRow = RowDataPacket & {
  id: number;
  user_id: number;
  merchant_oid: string;
  status: string;
  total_kurus: number;
  email: string;
  is_recurring: number;
};

export async function getOrderByMerchantOid(merchantOid: string): Promise<OrderRow | null> {
  return queryOne<OrderRow>("SELECT * FROM orders WHERE merchant_oid = ? LIMIT 1", [merchantOid]);
}

export async function getFirstOrderItem(
  orderId: number
): Promise<{ sku: string; title: string; unitPriceKurus: number; qty: number } | null> {
  const row = await queryOne<RowDataPacket & {
    sku: string;
    title: string;
    unit_price_kurus: number;
    qty: number;
  }>(
    "SELECT sku, title, unit_price_kurus, qty FROM order_items WHERE order_id = ? ORDER BY id ASC LIMIT 1",
    [orderId]
  );
  if (!row) return null;
  return {
    sku: row.sku,
    title: row.title,
    unitPriceKurus: Number(row.unit_price_kurus),
    qty: Number(row.qty),
  };
}

export async function markOrderPaid(merchantOid: string): Promise<void> {
  await execute(
    "UPDATE orders SET status = 'paid', paid_at = NOW() WHERE merchant_oid = ? AND status <> 'paid'",
    [merchantOid]
  );
}

export async function markOrderFailed(merchantOid: string, reason: string): Promise<void> {
  await execute(
    "UPDATE orders SET status = 'failed', fail_reason = ? WHERE merchant_oid = ? AND status = 'pending'",
    [reason.slice(0, 250), merchantOid]
  );
}

export async function recordPaymentEvent(input: {
  orderId: number | null;
  merchantOid: string;
  status: string;
  totalAmountKurus: number | null;
  hashValid: boolean;
  raw: unknown;
}): Promise<void> {
  await execute(
    `INSERT INTO payment_events (order_id, merchant_oid, provider, status, total_amount_kurus, hash_valid, raw)
     VALUES (?, ?, 'paytr', ?, ?, ?, ?)`,
    [
      input.orderId,
      input.merchantOid,
      input.status,
      input.totalAmountKurus,
      input.hashValid ? 1 : 0,
      JSON.stringify(input.raw ?? {}),
    ]
  );
}

export type OrderWithItems = {
  id: number;
  merchantOid: string;
  status: string;
  totalKurus: number;
  createdAt: string;
  paidAt: string | null;
  items: { title: string; sku: string; unitPriceKurus: number; qty: number }[];
};

export async function listOrders(userId: number): Promise<OrderWithItems[]> {
  const orders = await query<(RowDataPacket & {
    id: number;
    merchant_oid: string;
    status: string;
    total_kurus: number;
    created_at: string;
    paid_at: string | null;
  })[]>(
    "SELECT id, merchant_oid, status, total_kurus, created_at, paid_at FROM orders WHERE user_id = ? ORDER BY id DESC",
    [userId]
  );

  if (orders.length === 0) return [];

  const ids = orders.map((o) => o.id);
  const placeholders = ids.map(() => "?").join(",");
  const items = await query<(RowDataPacket & {
    order_id: number;
    title: string;
    sku: string;
    unit_price_kurus: number;
    qty: number;
  })[]>(
    `SELECT order_id, title, sku, unit_price_kurus, qty FROM order_items WHERE order_id IN (${placeholders})`,
    ids
  );

  const itemsByOrder = new Map<number, OrderWithItems["items"]>();
  for (const it of items) {
    const list = itemsByOrder.get(it.order_id) ?? [];
    list.push({
      title: it.title,
      sku: it.sku,
      unitPriceKurus: Number(it.unit_price_kurus),
      qty: Number(it.qty),
    });
    itemsByOrder.set(it.order_id, list);
  }

  return orders.map((o) => ({
    id: Number(o.id),
    merchantOid: o.merchant_oid,
    status: o.status,
    totalKurus: Number(o.total_kurus),
    createdAt: typeof o.created_at === "string" ? o.created_at : new Date(o.created_at).toISOString(),
    paidAt: o.paid_at ? (typeof o.paid_at === "string" ? o.paid_at : new Date(o.paid_at).toISOString()) : null,
    items: itemsByOrder.get(o.id) ?? [],
  }));
}
