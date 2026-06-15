import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { listOrders } from "@/lib/order-store";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Önce giriş yapın." }, { status: 401 });
  }
  const orders = await listOrders(user.id);
  return NextResponse.json({ orders });
}
