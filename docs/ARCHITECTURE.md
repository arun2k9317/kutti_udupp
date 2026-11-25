# Kutti Udupp — System Architecture

## 1. Overview

Kutti Udupp is a custom Shopify-style children's clothing e-commerce platform built for the Indian market on **Next.js App Router**, **TypeScript**, **Mantine UI**, and **PostgreSQL + Knex.js**.

The platform is organized as a modular monolith inside a single Next.js repository:
- **Storefront (`src/app/(store)/`)**: Server-Component-first public shopping experience with interactive client islands for navigation, search, variant selection, cart, wishlist, and checkout.
- **Admin Dashboard (`src/app/admin/`)**: Role-protected web administration console for catalog, inventory, orders, customers, coupons, and store settings.
- **API Layer (`src/app/api/`)**: Next.js Route Handlers enforcing authentication, Zod request validation, and calling domain services.
- **Domain Modules (`src/modules/`)**: Clean separation of concerns across `auth`, `products`, `categories`, `cart`, `customers`, `orders`, `payments`, `inventory`, and `coupons`.

## 2. Backend Layering

Every backend endpoint strictly adheres to:

```
Route Handler -> Zod Validation -> Service -> Repository -> Knex -> PostgreSQL
```

- **Route Handlers**: Parse HTTP requests, verify customer or admin session cookies, validate payloads with Zod, delegate to Services, and return structured JSON responses with appropriate HTTP status codes.
- **Services**: Encapsulate business rules, price/discount/tax calculations in integer paise, stock checks, idempotency, and database transaction orchestration.
- **Repositories**: Pure data-access layer using Knex query builder; no business logic or HTTP concerns.

## 3. Technology Stack

| Layer | Technology | Rules |
|---|---|---|
| Framework | Next.js App Router (TypeScript) | Server Components by default; Client Components only for interactivity |
| UI System | Mantine UI, Mantine Hooks, Mantine Form, Tabler Icons | No Tailwind CSS, no Shadcn UI |
| State | Zustand (client cart/wishlist sync) | Server-authoritative prices and inventory |
| Validation | Zod | Shared schemas for client/server validation |
| Database | PostgreSQL + Knex.js | Numeric `BIGINT GENERATED ALWAYS AS IDENTITY` PKs; no Prisma/Drizzle |
| Auth | HTTP-only session cookies, Argon2id/bcrypt, SMS OTP | 5-min OTP TTL, hashed OTP storage, rate limits |
| Payments | Razorpay Node SDK + Webhooks | Signature verification + idempotent webhook processing |
| Media | Cloudinary / S3-compatible URLs | Never store binaries in PostgreSQL |

## 4. Directory Structure

```text
src/
  app/
    (store)/           # Customer-facing storefront routes
    admin/             # Admin dashboard routes
    api/               # Next.js Route Handlers
  components/
    storefront/        # Header, Footer, Hero, ProductCard, Drawers
    admin/             # AdminShell, Dashboard widgets, Data tables
    shared/            # Reusable UI primitives
  data/                # Phase 1-2 structured mock catalog (replaced by DB in Phase 4)
  modules/             # Domain services, repositories, types
  db/                  # Knex configuration, migrations, seeds
  lib/                 # Theme, formatters (INR paise), constants, helpers
  store/               # Zustand client stores (cart, wishlist, UI drawers)
  validations/         # Zod schemas
docs/                  # Architecture, Database, Design System, Plan, API Reference
```
