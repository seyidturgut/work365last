// Work365 veritabanı kurulum + seed script'i.
// Çalıştırma: node scripts/db-setup.mjs
// MAMP MySQL açık olmalı (varsayılan: 127.0.0.1:8889 root/root).

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

// --- Basit .env.local yükleyici (node otomatik yüklemez) ---
function loadEnv() {
  const file = path.join(root, ".env.local");
  if (!existsSync(file)) return;
  const content = readFileSync(file, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnv();

const DB = {
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 8889),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD ?? "root",
  database: process.env.DB_NAME || "work365",
};

async function main() {
  console.log(`→ MySQL bağlanılıyor: ${DB.user}@${DB.host}:${DB.port}`);

  // 1) Veritabanını oluştur
  const admin = await mysql.createConnection({
    host: DB.host,
    port: DB.port,
    user: DB.user,
    password: DB.password,
    multipleStatements: true,
  });
  await admin.query(
    `CREATE DATABASE IF NOT EXISTS \`${DB.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
  );
  console.log(`✓ Veritabanı hazır: ${DB.database}`);
  await admin.end();

  // 2) Şemayı uygula
  const conn = await mysql.createConnection({
    host: DB.host,
    port: DB.port,
    user: DB.user,
    password: DB.password,
    database: DB.database,
    multipleStatements: true,
  });

  const schema = readFileSync(path.join(root, "db", "schema.sql"), "utf8");
  await conn.query(schema);
  console.log("✓ Tablolar oluşturuldu (schema.sql)");

  // Var olan orders tablosuna eksik kolonları ekle (idempotent migration)
  async function ensureColumn(table, column, definition) {
    const [rows] = await conn.query(
      `SELECT COUNT(*) AS c FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
      [DB.database, table, column]
    );
    if (rows[0].c === 0) {
      await conn.query(`ALTER TABLE \`${table}\` ADD COLUMN ${definition}`);
      console.log(`  + ${table}.${column} eklendi`);
    }
  }

  const orderCols = [
    ["is_recurring", "is_recurring TINYINT(1) NOT NULL DEFAULT 0"],
    ["billing_type", "billing_type ENUM('individual','corporate') NULL"],
    ["billing_name", "billing_name VARCHAR(190) NOT NULL DEFAULT ''"],
    ["billing_tckn", "billing_tckn VARCHAR(20) NOT NULL DEFAULT ''"],
    ["billing_company", "billing_company VARCHAR(255) NOT NULL DEFAULT ''"],
    ["billing_vkn", "billing_vkn VARCHAR(20) NOT NULL DEFAULT ''"],
    ["billing_tax_office", "billing_tax_office VARCHAR(190) NOT NULL DEFAULT ''"],
    ["billing_address", "billing_address VARCHAR(500) NOT NULL DEFAULT ''"],
    ["billing_city", "billing_city VARCHAR(120) NOT NULL DEFAULT ''"],
    ["billing_phone", "billing_phone VARCHAR(40) NOT NULL DEFAULT ''"],
    ["consents", "consents JSON NULL"],
  ];
  for (const [col, def] of orderCols) await ensureColumn("orders", col, def);
  console.log("✓ orders kolonları senkronlandı");

  // 3) Ürünleri seed et (catalog.json'dan upsert)
  const catalog = JSON.parse(readFileSync(path.join(root, "db", "catalog.json"), "utf8"));
  let seeded = 0;
  for (const p of catalog) {
    await conn.execute(
      `INSERT INTO products (sku, company_type, tier, term, title, subtitle, price_kurus, active, sort)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)
       ON DUPLICATE KEY UPDATE
         company_type = VALUES(company_type),
         tier = VALUES(tier),
         term = VALUES(term),
         title = VALUES(title),
         subtitle = VALUES(subtitle),
         price_kurus = VALUES(price_kurus),
         active = 1,
         sort = VALUES(sort)`,
      [p.sku, p.companyType, p.tier, p.term, p.title, p.subtitle, p.priceKurus, p.sort]
    );
    seeded += 1;
  }
  console.log(`✓ ${seeded} ürün seed edildi (products)`);

  const [[{ cnt }]] = await conn.query("SELECT COUNT(*) AS cnt FROM products");
  console.log(`→ products toplam: ${cnt}`);

  await conn.end();
  console.log("✅ Kurulum tamamlandı.");
}

main().catch((err) => {
  console.error("❌ Kurulum hatası:", err.message);
  process.exit(1);
});
