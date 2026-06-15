-- Work365 e-ticaret şeması (MySQL / MAMP)
-- Fiyatlar kuruş (INT) olarak tutulur. Karakter seti utf8mb4.

SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(190) NOT NULL DEFAULT '',
  phone VARCHAR(40) NOT NULL DEFAULT '',
  is_demo TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS products (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(190) NOT NULL,
  company_type VARCHAR(64) NOT NULL DEFAULT '',
  tier VARCHAR(64) NOT NULL DEFAULT '',
  term ENUM('monthly','yearly','once') NOT NULL DEFAULT 'monthly',
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NOT NULL DEFAULT '',
  price_kurus INT UNSIGNED NOT NULL,
  active TINYINT(1) NOT NULL DEFAULT 1,
  sort INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_products_sku (sku)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS carts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  status ENUM('active','converted','abandoned') NOT NULL DEFAULT 'active',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_carts_user (user_id),
  CONSTRAINT fk_carts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cart_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  cart_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  sku VARCHAR(190) NOT NULL,
  title VARCHAR(255) NOT NULL,
  unit_price_kurus INT UNSIGNED NOT NULL,
  qty INT UNSIGNED NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_cart_product (cart_id, product_id),
  KEY idx_cart_items_cart (cart_id),
  CONSTRAINT fk_cart_items_cart FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
  CONSTRAINT fk_cart_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS orders (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  merchant_oid VARCHAR(64) NOT NULL,
  status ENUM('pending','paid','failed','canceled') NOT NULL DEFAULT 'pending',
  total_kurus INT UNSIGNED NOT NULL,
  currency CHAR(2) NOT NULL DEFAULT 'TL',
  email VARCHAR(190) NOT NULL DEFAULT '',
  paytr_token TEXT NULL,
  fail_reason VARCHAR(255) NULL,
  is_recurring TINYINT(1) NOT NULL DEFAULT 0,
  billing_type ENUM('individual','corporate') NULL,
  billing_name VARCHAR(190) NOT NULL DEFAULT '',
  billing_tckn VARCHAR(20) NOT NULL DEFAULT '',
  billing_company VARCHAR(255) NOT NULL DEFAULT '',
  billing_vkn VARCHAR(20) NOT NULL DEFAULT '',
  billing_tax_office VARCHAR(190) NOT NULL DEFAULT '',
  billing_address VARCHAR(500) NOT NULL DEFAULT '',
  billing_city VARCHAR(120) NOT NULL DEFAULT '',
  billing_phone VARCHAR(40) NOT NULL DEFAULT '',
  consents JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  paid_at DATETIME NULL,
  UNIQUE KEY uq_orders_merchant_oid (merchant_oid),
  KEY idx_orders_user (user_id),
  CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS subscriptions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  product_sku VARCHAR(190) NOT NULL,
  title VARCHAR(255) NOT NULL,
  amount_kurus INT UNSIGNED NOT NULL,
  interval_unit ENUM('monthly') NOT NULL DEFAULT 'monthly',
  status ENUM('active','past_due','canceled','ended') NOT NULL DEFAULT 'active',
  original_order_id BIGINT UNSIGNED NULL,
  paytr_recurring_token VARCHAR(255) NULL,
  next_charge_at DATETIME NOT NULL,
  last_charge_at DATETIME NULL,
  fail_count INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  canceled_at DATETIME NULL,
  KEY idx_subscriptions_user (user_id),
  KEY idx_subscriptions_due (status, next_charge_at),
  CONSTRAINT fk_subscriptions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS subscription_charges (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  subscription_id BIGINT UNSIGNED NOT NULL,
  order_id BIGINT UNSIGNED NULL,
  merchant_oid VARCHAR(64) NOT NULL DEFAULT '',
  status VARCHAR(32) NOT NULL DEFAULT '',
  amount_kurus INT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_sub_charges_sub (subscription_id),
  CONSTRAINT fk_sub_charges_sub FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS order_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NULL,
  sku VARCHAR(190) NOT NULL,
  title VARCHAR(255) NOT NULL,
  unit_price_kurus INT UNSIGNED NOT NULL,
  qty INT UNSIGNED NOT NULL DEFAULT 1,
  KEY idx_order_items_order (order_id),
  CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS payment_events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT UNSIGNED NULL,
  merchant_oid VARCHAR(64) NOT NULL DEFAULT '',
  provider VARCHAR(32) NOT NULL DEFAULT 'paytr',
  status VARCHAR(32) NOT NULL DEFAULT '',
  total_amount_kurus INT NULL,
  hash_valid TINYINT(1) NOT NULL DEFAULT 0,
  raw JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_payment_events_order (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
