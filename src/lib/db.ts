import mysql from "mysql2/promise";

type GlobalWithPool = typeof globalThis & {
  __work365MysqlPool?: mysql.Pool;
};

const globalForPool = globalThis as GlobalWithPool;

export function getPool(): mysql.Pool {
  if (!globalForPool.__work365MysqlPool) {
    globalForPool.__work365MysqlPool = mysql.createPool({
      host: process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_PORT || 8889),
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD ?? "root",
      database: process.env.DB_NAME || "work365",
      waitForConnections: true,
      connectionLimit: 10,
      charset: "utf8mb4",
      timezone: "Z",
      decimalNumbers: true,
    });
  }
  return globalForPool.__work365MysqlPool;
}

export type SqlParam = string | number | boolean | null | Date;

export async function query<T = mysql.RowDataPacket[]>(
  sql: string,
  params: SqlParam[] = []
): Promise<T> {
  const [rows] = await getPool().execute(sql, params);
  return rows as T;
}

export async function queryOne<T = mysql.RowDataPacket>(
  sql: string,
  params: SqlParam[] = []
): Promise<T | null> {
  const rows = await query<mysql.RowDataPacket[]>(sql, params);
  return (rows[0] as T) ?? null;
}

export async function execute(
  sql: string,
  params: SqlParam[] = []
): Promise<mysql.ResultSetHeader> {
  const [result] = await getPool().execute(sql, params);
  return result as mysql.ResultSetHeader;
}
