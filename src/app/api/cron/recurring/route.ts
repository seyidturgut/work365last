import crypto from "node:crypto";
import { NextResponse } from "next/server";
import {
  advanceAfterSuccess,
  getDueSubscriptions,
  markChargeFailed,
  recordSubscriptionCharge,
} from "@/lib/subscription-store";
import { chargeRecurring } from "@/lib/paytr";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function genMerchantOid(subId: number): string {
  const rand = crypto.randomBytes(4).toString("hex");
  return `WR${Date.now().toString(36)}${subId}${rand}`.replace(/[^a-zA-Z0-9]/g, "");
}

function authorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET || "";
  if (!secret) return false;
  const url = new URL(request.url);
  const provided = url.searchParams.get("key") || request.headers.get("x-cron-secret") || "";
  return (
    provided.length === secret.length &&
    crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(secret))
  );
}

async function runDue() {
  const due = await getDueSubscriptions(200);
  const results: { id: number; status: string }[] = [];

  for (const sub of due) {
    const merchantOid = genMerchantOid(sub.id);
    const result = await chargeRecurring({
      merchantOid,
      email: sub.email,
      amountKurus: sub.amountKurus,
      userIp: "127.0.0.1",
      recurringToken: sub.recurringToken,
    });

    await recordSubscriptionCharge({
      subscriptionId: sub.id,
      orderId: null,
      merchantOid,
      status: result.status,
      amountKurus: sub.amountKurus,
    });

    if (result.ok) {
      await advanceAfterSuccess(sub.id);
      results.push({ id: sub.id, status: "charged" });
    } else {
      await markChargeFailed(sub.id, sub.failCount);
      results.push({ id: sub.id, status: `failed:${result.status}` });
    }
  }

  return { processed: due.length, results };
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  const summary = await runDue();
  return NextResponse.json({ ok: true, ...summary });
}

// Cron servisleri GET kullanabilir; aynı korumayla.
export async function GET(request: Request) {
  return POST(request);
}
