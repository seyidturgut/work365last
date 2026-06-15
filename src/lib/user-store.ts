import bcrypt from "bcryptjs";
import { execute, queryOne } from "@/lib/db";

export type AppUser = {
  id: number;
  email: string;
  fullName: string;
  phone: string;
  isDemo: boolean;
};

type UserRow = {
  id: number;
  email: string;
  password_hash: string;
  full_name: string;
  phone: string;
  is_demo: number;
};

function toAppUser(row: UserRow): AppUser {
  return {
    id: Number(row.id),
    email: row.email,
    fullName: row.full_name,
    phone: row.phone,
    isDemo: Boolean(row.is_demo),
  };
}

export async function findUserByEmail(email: string): Promise<UserRow | null> {
  return queryOne<UserRow>("SELECT * FROM users WHERE email = ? LIMIT 1", [
    email.trim().toLowerCase(),
  ]);
}

export async function getUserById(id: number | string | null | undefined): Promise<AppUser | null> {
  if (!id) return null;
  const row = await queryOne<UserRow>("SELECT * FROM users WHERE id = ? LIMIT 1", [id]);
  return row ? toAppUser(row) : null;
}

export async function createUser(input: {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  isDemo?: boolean;
}): Promise<AppUser> {
  const email = input.email.trim().toLowerCase();
  const existing = await findUserByEmail(email);
  if (existing) {
    throw new Error("Bu e-posta ile daha önce hesap oluşturulmuş.");
  }

  const passwordHash = await bcrypt.hash(input.password, 10);
  const result = await execute(
    `INSERT INTO users (email, password_hash, full_name, phone, is_demo)
     VALUES (?, ?, ?, ?, ?)`,
    [email, passwordHash, input.fullName.trim(), input.phone.trim(), input.isDemo ? 1 : 0]
  );

  const user = await getUserById(result.insertId);
  if (!user) throw new Error("Kullanıcı oluşturulamadı.");
  return user;
}

export async function verifyLogin(email: string, password: string): Promise<AppUser> {
  const row = await findUserByEmail(email);
  if (!row) {
    throw new Error("E-posta veya şifre hatalı.");
  }
  const ok = await bcrypt.compare(password, row.password_hash);
  if (!ok) {
    throw new Error("E-posta veya şifre hatalı.");
  }
  return toAppUser(row);
}

/** Google demo: gerçek (is_demo=1) bir kullanıcı kaydı yaratır. */
export async function createGoogleDemoUser(): Promise<AppUser> {
  const stamp = Date.now().toString(36) + Math.floor(performance.now()).toString(36);
  const email = `google-demo-${stamp}@work365.local`;
  return createUser({
    email,
    password: `demo-${stamp}`,
    fullName: "Google Demo Kullanıcısı",
    phone: "",
    isDemo: true,
  });
}
