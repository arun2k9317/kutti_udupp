# Kutti Udupp — Brand & Design System

## 1. Brand Personality

Kutti Udupp is an independent Indian children's fashion boutique:
- **Warm & Tactile**: Breathable organic cottons, linens, and gentle festive weaves.
- **Refined & Playful**: Editorial poise without sterile minimalism or loud cartoon clutter.
- **Trustworthy**: Clear INR pricing, honest sizing by age/months, accessible contrast.

## 2. Colour Tokens

All colour tokens are centralized in `src/lib/theme.ts` and `src/app/globals.css`:

| Token | Hex | Role |
|---|---|---|
| Primary Background | `#F8F5F0` | Warm ivory/oatmeal page canvas |
| Secondary Background | `#FFFFFF` | Cards, drawers, modals, elevated surfaces |
| Subtle Surface | `#F2ECE3` | Soft cream tint for image frames & hover fills |
| Primary Accent | `#EBCBCB` | Dusty blush rose (badges, soft highlights) |
| Secondary Accent | `#A9B8A0` | Soft sage green (trust cues, organic accents) |
| Warm Accent | `#C89B72` | Terracotta caramel (CTAs, editorial emphasis) |
| Primary Text | `#35312F` | Deep warm espresso charcoal |
| Secondary Text | `#77716C` | Muted warm stone |
| Borders | `#EAE4DC` | Hairline warm sand dividers |

## 3. Typography

Loaded via `next/font/google` in `src/app/layout.tsx`:
- **Display / Headings**: `Playfair Display` (weights 400, 500, 600, 700, normal & italic)
- **Body / Interface**: `DM Sans` (weights 400, 500, 600, 700)

Type Scale Guidelines:
- Hero Display: `clamp(2.1rem, 4.2vw, 3.5rem)`, line-height `1.12`, tight letter-spacing `-0.02em`.
- Section Headings: `clamp(1.65rem, 2.5vw, 2.25rem)`, `Playfair Display`.
- Product Card Title: `0.95rem`–`1rem`, `DM Sans` weight `500`, max 2 lines.
- Micro Eyebrows / Labels: `0.75rem`, uppercase, `letter-spacing: 0.12em`.

## 4. Layout, Spacing & Elevation

- **Max Container Width**: `1320px` (`xl`), generous vertical section rhythm (`64px`–`96px` on desktop, `44px`–`56px` on mobile).
- **Radii**: Subtle `6px` (`sm`) to `10px` (`md`) on cards/buttons; pill badges (`9999px`) reserved for compact tags and counts.
- **Shadows**: Near-flat boutique aesthetic; hairline `1px solid #EAE4DC` borders with soft hover elevation (`0 10px 28px rgba(53, 49, 47, 0.06)`).
- **Images**: Consistent aspect ratios (`4 / 5` for portrait product/category cards, `16 / 10` for editorial banners) with `object-fit: cover` and smooth `scale(1.03)` hover transitions.
