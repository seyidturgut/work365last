import crypto from "node:crypto";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { getUserById, type AppUser } from "@/lib/user-store";

export const SESSION_COOKIE = "work365_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 gün

function secret(): string {
  return process.env.AUTH_SECRET || "work365-dev-secret";
}

function sign(value: string): string {
  return crypto.createHmac("sha256", secret()).update(value).digest("base64url");
}

function makeToken(userId: number): string {
  const payload = String(userId);
  return `${payload}.${sign(payload)}`;
}

function readToken(token: string | undefined | null): number | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot === -1) return null;
  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = sign(payload);
  if (
    signature.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  ) {
    return null;
  }
  const id = Number(payload);
  return Number.isFinite(id) && id > 0 ? id : null;
}

export function setSessionCookie(response: NextResponse, userId: number) {
  response.cookies.set(SESSION_COOKIE, makeToken(userId), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function getSessionUserIdFromCookies(
  cookieStore: Pick<ReadonlyRequestCookies, "get">
): number | null {
  return readToken(cookieStore.get(SESSION_COOKIE)?.value);
}

/** Route handler / server component: mevcut kullanıcıyı DB'den getirir. */
export async function getCurrentUser(): Promise<AppUser | null> {
  const cookieStore = await cookies();
  const userId = getSessionUserIdFromCookies(cookieStore);
  if (!userId) return null;
  return getUserById(userId);
}
