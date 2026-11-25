# Kutti Udupp — Database Design Specification

> **Status**: Planned for Phase 4. Not yet connected in Phase 1.

## 1. Primary Key & Monetary Conventions

- **Primary Keys**: `BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY` on every table.
- **Foreign Keys**: `BIGINT` referencing parent identity columns. No UUID primary keys.
- **JavaScript Handling**: Configure `pg` / Knex type parsers for `int8` (OID 20) safely, serializing large IDs as strings where needed to avoid unsafe `Number` precision loss.
- **Prices & Currency**: Stored exclusively as integer **paise** (`BIGINT` / `INTEGER`, e.g., ₹1,299.00 = `129900`).
- **Public References**: Customer-facing order numbers use formatted human-readable strings (`KU-2026-000001`), never raw auto-increment IDs.

## 2. Planned Schema Modules

### Product Catalogue
- `categories` (`id`, `parent_id`, `name`, `slug`, `description`, `image_url`, `display_order`, `is_active`, timestamps)
- `size_groups` (`id`, `name`, `code`)
- `product_sizes` (`id`, `size_group_id`, `label`, `age_range`, `sort_order`)
- `products` (`id`, `category_id`, `name`, `slug`, `sku_prefix`, `description`, `gender`, `age_group`, `fabric`, `care_instructions`, `base_price_paise`, `compare_at_price_paise`, `status`, `is_featured`, `is_best_seller`, timestamps, `deleted_at`)
- `product_variants` (`id`, `product_id`, `size_id`, `color_name`, `color_hex`, `sku`, `price_paise`, `compare_at_price_paise`, `stock_quantity`, `is_active`, timestamps)
- `product_images` (`id`, `product_id`, `variant_id`, `url`, `alt_text`, `sort_order`, `is_primary`)

### Authentication & Customers
- `customers` (`id`, `full_name`, `email`, `email_verified_at`, `mobile`, `mobile_verified_at`, `password_hash`, `is_active`, timestamps)
- `customer_sessions` (`id`, `customer_id`, `token_hash`, `user_agent`, `ip_address`, `expires_at`, `revoked_at`, timestamps)
- `otp_verifications` (`id`, `mobile`, `purpose`, `otp_hash`, `attempts`, `max_attempts`, `expires_at`, `consumed_at`, `created_at`)
- `password_reset_tokens` (`id`, `customer_id`, `token_hash`, `expires_at`, `used_at`, `created_at`)
- `email_verification_tokens` (`id`, `customer_id`, `token_hash`, `expires_at`, `used_at`, `created_at`)
- `customer_addresses` (`id`, `customer_id`, `recipient_name`, `mobile`, `line1`, `line2`, `landmark`, `city`, `state`, `pincode`, `address_type`, `is_default`, timestamps)
- `wishlists` (`id`, `customer_id`, timestamps)
- `wishlist_items` (`id`, `wishlist_id`, `product_id`, `variant_id`, `created_at`)

### Cart, Orders & Payments
- `carts` (`id`, `customer_id`, `guest_token`, `coupon_id`, `expires_at`, timestamps)
- `cart_items` (`id`, `cart_id`, `product_id`, `variant_id`, `quantity`, timestamps)
- `orders` (`id`, `order_number`, `customer_id`, `status`, `payment_status`, `subtotal_paise`, `discount_paise`, `shipping_paise`, `tax_paise`, `total_paise`, `coupon_code`, `tracking_number`, `notes`, timestamps)
- `order_items` (`id`, `order_id`, `product_id`, `variant_id`, `product_name_snapshot`, `sku_snapshot`, `size_snapshot`, `color_snapshot`, `unit_price_paise`, `quantity`, `line_total_paise`)
- `order_addresses` (`id`, `order_id`, `recipient_name`, `mobile`, `line1`, `line2`, `city`, `state`, `pincode`)
- `order_status_history` (`id`, `order_id`, `from_status`, `to_status`, `changed_by_admin_id`, `note`, `created_at`)
- `payments` (`id`, `order_id`, `gateway`, `razorpay_order_id`, `amount_paise`, `currency`, `status`, `idempotency_key`, timestamps)
- `payment_transactions` (`id`, `payment_id`, `razorpay_payment_id`, `method`, `status`, `raw_payload`, timestamps)
- `payment_webhook_events` (`id`, `event_id`, `event_type`, `signature_verified`, `processed_at`, `payload`, `created_at`)
- `refunds` (`id`, `payment_id`, `order_id`, `razorpay_refund_id`, `amount_paise`, `reason`, `status`, timestamps)

### Inventory, Marketing & Administration
- `inventory_movements` (`id`, `variant_id`, `delta`, `balance_after`, `reason`, `reference_type`, `reference_id`, `admin_user_id`, `created_at`)
- `coupons` (`id`, `code`, `discount_type`, `discount_value`, `min_order_paise`, `max_discount_paise`, `usage_limit`, `per_customer_limit`, `starts_at`, `ends_at`, `is_active`, timestamps)
- `coupon_usages` (`id`, `coupon_id`, `customer_id`, `order_id`, `created_at`)
- `newsletter_subscribers` (`id`, `email`, `is_active`, `created_at`)
- `admin_users` (`id`, `name`, `email`, `password_hash`, `role_id`, `is_active`, timestamps)
- `admin_roles`, `admin_permissions`, `admin_role_permissions`
- `store_settings` (`id`, `key`, `value_json`, `updated_at`)
- `homepage_banners` (`id`, `title`, `subtitle`, `cta_label`, `cta_href`, `image_url`, `placement`, `sort_order`, `is_active`, timestamps)
