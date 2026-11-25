# Kutti Udupp — API Reference (Planned)

> **Status**: Endpoints will be implemented incrementally starting in Phase 4. Phase 1 uses typed local sample data (`src/data/catalog.ts`) with client-side Zustand cart and wishlist state.

## Planned Endpoint Groups

### Auth (`/api/auth/*`)
- `POST /api/auth/otp/request` — Request SMS OTP (rate-limited, 5-min expiry)
- `POST /api/auth/otp/verify` — Verify OTP & establish HTTP-only session cookie
- `POST /api/auth/register` — Register with email & password
- `POST /api/auth/login` — Email/password login
- `POST /api/auth/logout` — Revoke current session
- `GET /api/auth/me` — Get authenticated customer profile

### Catalogue (`/api/products/*`, `/api/categories/*`)
- `GET /api/products` — Filterable, sortable, paginated product catalogue
- `GET /api/products/[slug]` — Product details with variants & size guide
- `GET /api/categories` — Active category hierarchy

### Cart & Wishlist (`/api/cart/*`, `/api/wishlist/*`)
- `GET /api/cart` — Fetch active guest or customer cart
- `POST /api/cart/items` — Add variant to cart
- `PATCH /api/cart/items/[id]` — Update item quantity
- `DELETE /api/cart/items/[id]` — Remove item from cart
- `POST /api/cart/merge` — Merge guest cart into customer cart on login

### Checkout, Orders & Payments (`/api/checkout`, `/api/orders/*`, `/api/payments/*`, `/api/webhooks/*`)
- `POST /api/checkout` — Validate address, stock, coupon; compute totals; create pending order + Razorpay order
- `POST /api/payments/razorpay/verify` — Verify Razorpay payment signature
- `POST /api/webhooks/razorpay` — Verify webhook signature and process idempotent payment/refund events
- `GET /api/orders` — Customer order history
- `GET /api/orders/[orderNumber]` — Customer order tracking details

### Admin (`/api/admin/*`)
- `GET/POST/PATCH /api/admin/products`
- `GET/POST/PATCH /api/admin/categories`
- `GET/POST /api/admin/inventory/adjust`
- `GET/PATCH /api/admin/orders`
- `GET /api/admin/customers`
- `GET/POST/PATCH /api/admin/coupons`
- `GET/PATCH /api/admin/settings`
