import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { listByUser } from "@/lib/subscription-store";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Önce giriş yapın." }, { status: 401 });
  }
  const subscriptions = await listByUser(user.id);
  return NextResponse.json({ subscriptions });
}
