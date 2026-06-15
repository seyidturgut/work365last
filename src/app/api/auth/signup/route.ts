import { NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/session";
import { createUser } from "@/lib/user-store";

export const runtime = "nodejs";

type SignupPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  next?: string;
};

function safeNext(next?: string): string {
  if (next && next.startsWith("/") && !next.startsWith("//")) return next;
  return "/hesabim";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignupPayload;
    const fullName = body.fullName?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const phone = body.phone?.trim() ?? "";
    const password = body.password ?? "";

    if (!fullName || !email || !password) {
      return NextResponse.json({ error: "Lütfen zorunlu alanları doldurun." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Şifre en az 8 karakter olmalıdır." }, { status: 400 });
    }

    const user = await createUser({ fullName, email, phone, password });

    const response = NextResponse.json({
      ok: true,
      redirectTo: safeNext(body.next),
      user: { id: user.id, email: user.email, fullName: user.fullName },
    });
    setSessionCookie(response, user.id);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Kayıt sırasında bir hata oluştu.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
