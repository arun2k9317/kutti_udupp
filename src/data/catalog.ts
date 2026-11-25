export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  image: string;
  itemCount: number;
}

export interface AgeGroupItem {
  id: string;
  label: string;
  slug: string;
  caption: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: string;
  categorySlug: string;
  gender: "Boys" | "Girls" | "Unisex" | "Baby";
  ageGroup: string;
  fabric: string;
  description: string;
  pricePaise: number;
  compareAtPricePaise?: number;
  image: string;
  secondaryImage?: string;
  sizes: string[];
  colors: ProductColor[];
  badge?: string;
  isNewArrival: boolean;
  isBestSeller: boolean;
  inStock: boolean;
}

export interface CollectionItem {
  id: string;
  title: string;
  slug: string;
  eyebrow: string;
  description: string;
  image: string;
  ctaLabel: string;
}

export interface TestimonialItem {
  id: string;
  parentName: string;
  city: string;
  childAge: string;
  rating: number;
  quote: string;
  purchasedItem: string;
}

export const ANNOUNCEMENTS: string[] = [
  "Little styles, big smiles — Complimentary shipping across India on orders above ₹1,499",
  "New Season Arrival: Pure Organic Linen & Handloom Festive Edit now live",
  "Gentle on delicate skin — 100% breathable cottons crafted for Indian summers",
];

export const SHOP_CATEGORIES: CategoryItem[] = [
  {
    id: "cat-boys",
    name: "Boys",
    slug: "boys",
    subtitle: "Linen shirts, tailored shorts & daily sets",
    image: "/images/cat-boys.jpg",
    itemCount: 42,
  },
  {
    id: "cat-girls",
    name: "Girls",
    slug: "girls",
    subtitle: "Smocked dresses, tiered frocks & co-ords",
    image: "/images/cat-girls.jpg",
    itemCount: 54,
  },
  {
    id: "cat-baby",
    name: "Baby Clothing",
    slug: "baby-clothing",
    subtitle: "Organic rompers, onesies & soft knits",
    image: "/images/cat-baby.jpg",
    itemCount: 36,
  },
  {
    id: "cat-dresses",
    name: "Dresses",
    slug: "dresses",
    subtitle: "Heirloom cotton frocks for play & parties",
    image: "/images/prod-smocked-dress.jpg",
    itemCount: 31,
  },
  {
    id: "cat-ethnic",
    name: "Ethnic Wear",
    slug: "ethnic-wear",
    subtitle: "Handloom kurtas, pavadais & festive sets",
    image: "/images/collection-festive.jpg",
    itemCount: 28,
  },
  {
    id: "cat-new",
    name: "New Arrivals",
    slug: "new-arrivals",
    subtitle: "Fresh boutique silhouettes just landed",
    image: "/images/cat-new-arrivals.jpg",
    itemCount: 24,
  },
];

export const AGE_GROUPS: AgeGroupItem[] = [
  { id: "age-0-6m", label: "0–6 Months", slug: "0-6-months", caption: "Newborn Essentials" },
  { id: "age-6-12m", label: "6–12 Months", slug: "6-12-months", caption: "Crawler Comfort" },
  { id: "age-1-2y", label: "1–2 Years", slug: "1-2-years", caption: "Toddler Play" },
  { id: "age-2-4y", label: "2–4 Years", slug: "2-4-years", caption: "Little Explorers" },
  { id: "age-4-6y", label: "4–6 Years", slug: "4-6-years", caption: "Playful Classics" },
  { id: "age-6-8y", label: "6–8 Years", slug: "6-8-years", caption: "Junior Boutique" },
];

export const SAMPLE_PRODUCTS: ProductItem[] = [
  {
    id: "prod-1",
    name: "Aanya Blush Smocked Cotton Dress",
    slug: "aanya-blush-smocked-cotton-dress",
    sku: "KU-DRS-101",
    category: "Dresses",
    categorySlug: "dresses",
    gender: "Girls",
    ageGroup: "2–4 Years",
    fabric: "100% GOTS Organic Mulmul Cotton",
    description:
      "Hand-smocked bodice with delicate flutter sleeves and soft cotton voile lining for all-day comfort.",
    pricePaise: 149900,
    compareAtPricePaise: 189900,
    image: "/images/prod-smocked-dress.jpg",
    secondaryImage: "/images/cat-girls.jpg",
    sizes: ["1-2Y", "2-4Y", "4-6Y", "6-8Y"],
    colors: [
      { name: "Dusty Blush", hex: "#EBCBCB" },
      { name: "Ivory Cream", hex: "#F4EFE6" },
    ],
    badge: "New",
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: "prod-2",
    name: "Aarav Sage Mandarin Linen Set",
    slug: "aarav-sage-mandarin-linen-shirt",
    sku: "KU-BOY-204",
    category: "Boys",
    categorySlug: "boys",
    gender: "Boys",
    ageGroup: "4–6 Years",
    fabric: "Belgian Linen-Cotton Blend",
    description:
      "Breathable mandarin-collar shirt and relaxed trousers finished with natural coconut-shell buttons.",
    pricePaise: 159900,
    compareAtPricePaise: 189900,
    image: "/images/prod-linen-shirt.jpg",
    secondaryImage: "/images/collection-linen.jpg",
    sizes: ["1-2Y", "2-4Y", "4-6Y", "6-8Y"],
    colors: [
      { name: "Soft Sage", hex: "#A9B8A0" },
      { name: "Oatmeal", hex: "#DFD7CB" },
    ],
    badge: "New",
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: "prod-3",
    name: "Nila Organic Cream Baby Romper",
    slug: "nila-ribbed-organic-baby-romper",
    sku: "KU-BAB-012",
    category: "Baby Clothing",
    categorySlug: "baby-clothing",
    gender: "Baby",
    ageGroup: "0–6 Months",
    fabric: "Combed Organic Interlock Cotton",
    description:
      "Ultra-soft full-length baby romper with fleece bunny detail and gentle snap closures for newborns.",
    pricePaise: 89900,
    compareAtPricePaise: 109900,
    image: "/images/cat-baby.jpg",
    secondaryImage: "/images/cat-new-arrivals.jpg",
    sizes: ["0-3M", "3-6M", "6-12M", "12-18M"],
    colors: [
      { name: "Oatmeal Cream", hex: "#EFE8DC" },
      { name: "Dusty Blush", hex: "#EBCBCB" },
    ],
    badge: "Organic",
    isNewArrival: true,
    isBestSeller: false,
    inStock: true,
  },
  {
    id: "prod-4",
    name: "Vihaan Ivory Chanderi Kurta Set",
    slug: "vihaan-ivory-chanderi-kurta-set",
    sku: "KU-ETH-308",
    category: "Ethnic Wear",
    categorySlug: "ethnic-wear",
    gender: "Boys",
    ageGroup: "2–4 Years",
    fabric: "Handloom Chanderi Cotton-Silk",
    description:
      "Heirloom ivory festive kurta with tonal woven stripes and soft elasticated cotton pyjama.",
    pricePaise: 219900,
    compareAtPricePaise: 269900,
    image: "/images/prod-kurta-set.jpg",
    secondaryImage: "/images/collection-festive.jpg",
    sizes: ["6-12M", "1-2Y", "2-4Y", "4-6Y", "6-8Y"],
    colors: [{ name: "Warm Ivory", hex: "#F7F3EA" }],
    badge: "Festive",
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: "prod-5",
    name: "Meera Oatmeal Embroidered Linen Co-ord",
    slug: "meera-wildflower-tiered-frock",
    sku: "KU-DRS-119",
    category: "Girls",
    categorySlug: "girls",
    gender: "Girls",
    ageGroup: "4–6 Years",
    fabric: "Hand-Embroidered Cotton Linen",
    description:
      "Relaxed oatmeal tunic with delicate floral embroidery and breathable ankle-length linen trousers.",
    pricePaise: 144900,
    compareAtPricePaise: 179900,
    image: "/images/prod-oatmeal-set.jpg",
    secondaryImage: "/images/collection-linen.jpg",
    sizes: ["1-2Y", "2-4Y", "4-6Y", "6-8Y"],
    colors: [
      { name: "Oatmeal", hex: "#EFE8DC" },
      { name: "Rose Petal", hex: "#EBCBCB" },
    ],
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: "prod-6",
    name: "Kabir Olive Twill Shorts & Tee Set",
    slug: "kabir-caramel-twill-chino-shorts-set",
    sku: "KU-BOY-215",
    category: "Boys",
    categorySlug: "boys",
    gender: "Boys",
    ageGroup: "2–4 Years",
    fabric: "Brushed Organic Cotton Twill",
    description:
      "Adjustable-waist olive cotton shorts paired with a playful botanical-illustrated jersey tee.",
    pricePaise: 129900,
    compareAtPricePaise: 159900,
    image: "/images/prod-shorts-flatlay.jpg",
    secondaryImage: "/images/cat-boys.jpg",
    sizes: ["1-2Y", "2-4Y", "4-6Y", "6-8Y"],
    colors: [
      { name: "Olive Sage", hex: "#5A6B47" },
      { name: "Sandstone", hex: "#D9CFC1" },
    ],
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: "prod-7",
    name: "Tara Sage Corduroy Overshirt Layer",
    slug: "tara-sage-cable-knit-cardigan",
    sku: "KU-UNI-402",
    category: "Baby Clothing",
    categorySlug: "baby-clothing",
    gender: "Unisex",
    ageGroup: "1–2 Years",
    fabric: "100% Fine Combed Cotton Corduroy",
    description:
      "Lightweight textured sage overshirt crafted for breezy evenings and layered weekend outings.",
    pricePaise: 159900,
    image: "/images/prod-chino-shorts.jpg",
    secondaryImage: "/images/promo-monsoon.jpg",
    sizes: ["6-12M", "1-2Y", "2-4Y", "4-6Y"],
    colors: [
      { name: "Sage Green", hex: "#A9B8A0" },
      { name: "Warm Terracotta", hex: "#C89B72" },
    ],
    badge: "Bestseller",
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: "prod-8",
    name: "Diya Peach Silk-Cotton Festive Lehenga",
    slug: "diya-peach-silk-cotton-festive-lehenga",
    sku: "KU-ETH-324",
    category: "Ethnic Wear",
    categorySlug: "ethnic-wear",
    gender: "Girls",
    ageGroup: "4–6 Years",
    fabric: "Pure Mulberry Silk-Cotton Blend",
    description:
      "Soft pastel peach skirt and zari-piped blouse lined with pure cotton mulmul so little ones stay itch-free.",
    pricePaise: 259900,
    compareAtPricePaise: 319900,
    image: "/images/prod-festive-lehenga.jpg",
    secondaryImage: "/images/collection-festive.jpg",
    sizes: ["1-2Y", "2-4Y", "4-6Y", "6-8Y"],
    colors: [{ name: "Pastel Peach", hex: "#F0C8B8" }],
    badge: "Limited",
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
  },
];

export const FEATURED_COLLECTIONS: CollectionItem[] = [
  {
    id: "col-linen",
    title: "The Sunlit Linen Edit",
    slug: "sunlit-linen-edit",
    eyebrow: "Summer Capsule 2026",
    description:
      "Featherlight European linen and organic cotton silhouettes woven to keep little adventurers cool from morning park dates to family brunches.",
    image: "/images/collection-linen.jpg",
    ctaLabel: "Explore Linen Edit",
  },
  {
    id: "col-festive",
    title: "Little Festive Heirlooms",
    slug: "little-festive-heirlooms",
    eyebrow: "Handloom Celebrations",
    description:
      "Soft Chanderi silks, breathable mulmul linings, and pastel artisanal embroidery crafted for weddings, naming ceremonies, and Diwali gatherings.",
    image: "/images/collection-festive.jpg",
    ctaLabel: "Shop Festive Wear",
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "rev-1",
    parentName: "Ananya Krishnan",
    city: "Bengaluru",
    childAge: "Mom to 3-year-old twins",
    rating: 5,
    quote:
      "Finally a kids clothing label in India that gets pastel palettes and pure breathable fabrics right. My daughter refuses to take off her blush smocked dress!",
    purchasedItem: "Aanya Blush Smocked Cotton Dress",
  },
  {
    id: "rev-2",
    parentName: "Rohan & Meenakshi Iyer",
    city: "Chennai",
    childAge: "Parents to 18-month-old",
    rating: 5,
    quote:
      "The Chanderi kurta had pure cotton lining inside—no scratchy seams at all during our family wedding. Packaging felt like unboxing a boutique gift.",
    purchasedItem: "Vihaan Ivory Chanderi Kurta Set",
  },
  {
    id: "rev-3",
    parentName: "Sneha Deshmukh",
    city: "Mumbai",
    childAge: "Mom to 5-year-old",
    rating: 5,
    quote:
      "Ordered the sage linen shirt and chino shorts set. Even after ten washes, the coconut buttons and organic fabric look crisp and brand new.",
    purchasedItem: "Aarav Sage Mandarin Linen Shirt",
  },
];
