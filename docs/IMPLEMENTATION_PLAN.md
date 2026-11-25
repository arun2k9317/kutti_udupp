# Kutti Udupp — Phased Implementation Plan

## Phase 1 — Foundation & Customer Homepage (Current)
- [x] Inspect repository & initialize Next.js App Router + TypeScript (no Tailwind, no Prisma/Drizzle)
- [x] Configure Mantine UI theme, `Playfair Display` & `DM Sans` via `next/font`, CSS tokens
- [x] Create project documentation (`ARCHITECTURE.md`, `DATABASE.md`, `DESIGN_SYSTEM.md`, `IMPLEMENTATION_PLAN.md`, `API_REFERENCE.md`)
- [x] Generate realistic boutique children's clothing imagery under `public/images/`
- [x] Build shared storefront layout: Announcement bar, sticky Header with mega-nav & mobile drawer, Search overlay/modal, Wishlist & Cart indicator drawers, Footer
- [x] Build responsive boutique Homepage: Editorial Hero, Shop by Category, Shop by Age, New Arrivals, Featured Collections, Best Sellers, Seasonal Promo Banner, Why Kutti Udupp, Testimonials, Newsletter
- [x] Build base Admin shell layout (`/admin` & `/admin/dashboard` preview shell) with Mantine `AppShell`
- [ ] Run `typecheck`, `lint`, production `build`, and inspect rendered UI across 375px, 768px, and 1440px in browser

## Phase 2 — Storefront Catalogue, PDP, Cart & Wishlist Pages
- [ ] `/products` catalogue with sidebar/drawer filters, sorting, pagination
- [ ] `/products/[slug]` PDP with gallery, zoom, variant selection, size guide modal
- [ ] `/categories/[slug]` & `/collections/[slug]`
- [ ] `/cart`, `/wishlist`, `/search`, `/about`, `/contact`, `/policies/*`

## Phase 3 — Admin Dashboard UI
- [ ] `/admin/dashboard` KPIs, charts, recent orders & low stock
- [ ] `/admin/products`, `/admin/categories`, `/admin/inventory`, `/admin/orders`, `/admin/customers`, `/admin/coupons`, `/admin/settings`

## Phase 4 — Database & Backend APIs
- [ ] PostgreSQL + Knex configuration & `BIGINT` identity migrations
- [ ] Seed realistic Indian kids clothing catalog & admin roles
- [ ] Repositories, services, Zod validations, Route Handlers

## Phase 5 — Customer Authentication & Account
- [ ] Mobile OTP flow (hashed OTP, 5-min expiry, rate limiting)
- [ ] Email/password auth, verification, password reset, HTTP-only sessions
- [ ] `/account/*` profile, addresses, order tracking

## Phase 6 — Checkout & Razorpay Integration
- [ ] Guest-to-customer cart merge
- [ ] Backend shipping/tax calculation & address PIN validation
- [ ] Razorpay order creation, signature verification, idempotent webhook handler, atomic inventory deduction

## Phase 7 — Production Hardening & QA
- [ ] Security audit, SEO (`sitemap.xml`, `robots.txt`, JSON-LD), unit & integration tests, performance optimization
