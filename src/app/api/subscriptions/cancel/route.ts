import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { cancelSubscription } from "@/lib/subscription-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Önce giriş yapın." }, { status: 401 });
  }
  const body = (await request.json()) as { id?: number };
  const id = Number(body.id);
  if (!id) {
    return NextResponse.json({ error: "Abonelik bulunamadı." }, { status: 400 });
  }
  const ok = await cancelSubscription(id, user.id);
  if (!ok) {
    return NextResponse.json({ error: "Abonelik iptal edilemedi." }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
