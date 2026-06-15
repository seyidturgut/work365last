import { NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/session";
import { createGoogleDemoUser, verifyLogin } from "@/lib/user-store";

export const runtime = "nodejs";

type LoginPayload = {
  email?: string;
  password?: string;
  provider?: "google";
  next?: string;
};

function safeNext(next?: string): string {
  if (next && next.startsWith("/") && !next.startsWith("//")) return next;
  return "/hesabim";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginPayload;

    const user =
      body.provider === "google"
        ? await createGoogleDemoUser()
        : await verifyLogin(body.email?.trim().toLowerCase() ?? "", body.password ?? "");

    const response = NextResponse.json({
      ok: true,
      redirectTo: safeNext(body.next),
      user: { id: user.id, email: user.email, fullName: user.fullName },
    });
    setSessionCookie(response, user.id);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Giriş sırasında bir hata oluştu.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
