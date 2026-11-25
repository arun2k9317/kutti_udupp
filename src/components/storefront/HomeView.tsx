"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Group,
  Paper,
  Rating,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconArrowRight,
  IconCheck,
  IconCopy,
  IconHeartHandshake,
  IconLeaf,
  IconShieldCheck,
  IconSparkles,
  IconTruckDelivery,
} from "@tabler/icons-react";
import {
  AGE_GROUPS,
  FEATURED_COLLECTIONS,
  ProductItem,
  SAMPLE_PRODUCTS,
  SHOP_CATEGORIES,
  TESTIMONIALS,
} from "@/data/catalog";
import { brandTokens } from "@/lib/theme";
import { ProductCard } from "@/components/storefront/ProductCard";
import { QuickViewModal } from "@/components/storefront/QuickViewModal";

const WHY_ITEMS = [
  {
    icon: IconLeaf,
    title: "Pure Organic Fabrics",
    description:
      "GOTS-certified mulmul cottons, handloom Chanderi, and breathable linens gentle on sensitive skin.",
  },
  {
    icon: IconSparkles,
    title: "Thoughtful Comfort",
    description:
      "Tag-free necklines, soft cotton linings, and adjustable waistbands made for effortless play.",
  },
  {
    icon: IconShieldCheck,
    title: "Secure Payments",
    description:
      "256-bit encrypted checkout supporting UPI, Credit & Debit Cards, Netbanking, and Razorpay.",
  },
  {
    icon: IconTruckDelivery,
    title: "India-Wide Delivery",
    description:
      "Dispatched from Bengaluru within 24 hours, with complimentary shipping above ₹1,499.",
  },
  {
    icon: IconHeartHandshake,
    title: "Easy 14-Day Exchanges",
    description:
      "Kids grow fast—enjoy hassle-free size exchanges and dedicated WhatsApp & email care.",
  },
];

export function HomeView() {
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [arrivalFilter, setArrivalFilter] = useState<string>("All");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const newArrivals = SAMPLE_PRODUCTS.filter((p) => {
    if (!p.isNewArrival) return false;
    if (arrivalFilter === "All") return true;
    return p.gender === arrivalFilter || (arrivalFilter === "Ethnic" && p.category === "Ethnic Wear");
  }).slice(0, 4);

  const bestSellers = SAMPLE_PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  const handleCopyCoupon = async () => {
    try {
      await navigator.clipboard.writeText("KUTTI15");
    } catch {
      // Clipboard may be unavailable in restricted contexts; still notify user
    }
    notifications.show({
      title: "Coupon code copied",
      message: "Use KUTTI15 at checkout for 15% off orders above ₹2,499.",
      color: "sage",
      icon: <IconCheck size={16} />,
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newsletterEmail.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      notifications.show({
        title: "Please enter a valid email",
        message: "We'll send your ₹250 welcome privilege right away.",
        color: "warm",
      });
      return;
    }
    setSubscribed(true);
    setNewsletterEmail("");
    notifications.show({
      title: "Welcome to the Kutti Udupp family",
      message: "Your ₹250 welcome code KUTTI250 is on its way to your inbox.",
      color: "sage",
      icon: <IconCheck size={16} />,
    });
  };

  return (
    <>
      {/* 1. EDITORIAL HERO SECTION */}
      <Box
        component="section"
        bg={brandTokens.bgPrimary}
        py={{ base: 32, md: 56 }}
        style={{ borderBottom: `1px solid ${brandTokens.border}` }}
      >
        <Container>
          <Grid gutter={{ base: 28, md: 48 }} align="center">
            <Grid.Col span={{ base: 12, md: 5.5 }}>
              <Stack gap="lg">
                <Group gap="xs">
                  <Badge
                    variant="filled"
                    bg={brandTokens.accentBlush}
                    c={brandTokens.textPrimary}
                    radius="sm"
                    size="sm"
                  >
                    New Capsule 2026
                  </Badge>
                  <Text className="ku-eyebrow">Crafted for India</Text>
                </Group>

                <Title
                  order={1}
                  className="ku-serif"
                  style={{
                    fontSize: "clamp(2.25rem, 4.4vw, 3.65rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: brandTokens.textPrimary,
                  }}
                >
                  Little Moments.
                  <br />
                  Beautiful Styles.
                </Title>

                <Text
                  fz={{ base: "md", md: "lg" }}
                  c={brandTokens.textSecondary}
                  maw={460}
                  lh={1.65}
                >
                  Discover adorable, breathable outfits made from organic cotton,
                  soft Belgian linen, and handloom weaves for every little adventure.
                </Text>

                <Group gap="sm" wrap="wrap" pt={4}>
                  <Button
                    component={Link}
                    href="/products"
                    size="lg"
                    color="espresso"
                    rightSection={<IconArrowRight size={17} />}
                    px={28}
                  >
                    Shop Now
                  </Button>
                  <Button
                    component={Link}
                    href="#featured-collections"
                    size="lg"
                    variant="outline"
                    color="espresso"
                    px={24}
                  >
                    Explore Collections
                  </Button>
                </Group>

                <Group
                  gap="lg"
                  pt="md"
                  mt={4}
                  style={{ borderTop: `1px solid ${brandTokens.border}` }}
                >
                  <Box>
                    <Text size="xs" fw={600}>
                      100% Natural Fibres
                    </Text>
                    <Text size="xs" c={brandTokens.textSecondary}>
                      Gentle on young skin
                    </Text>
                  </Box>
                  <Box>
                    <Text size="xs" fw={600}>
                      Ages 0 – 8 Years
                    </Text>
                    <Text size="xs" c={brandTokens.textSecondary}>
                      True Indian sizing
                    </Text>
                  </Box>
                  <Box>
                    <Text size="xs" fw={600}>
                      Pan-India Shipping
                    </Text>
                    <Text size="xs" c={brandTokens.textSecondary}>
                      Free above ₹1,499
                    </Text>
                  </Box>
                </Group>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6.5 }}>
              <Box
                pos="relative"
                bg={brandTokens.bgSubtle}
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  border: `1px solid ${brandTokens.border}`,
                  aspectRatio: "16 / 11",
                }}
              >
                <img
                  src="/images/hero-editorial.jpg"
                  alt="Children dressed in Kutti Udupp organic linen shirt and blush smocked cotton dress"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 20%",
                    display: "block",
                  }}
                />
                <Paper
                  pos="absolute"
                  bottom={16}
                  left={16}
                  px="md"
                  py="xs"
                  radius="md"
                  visibleFrom="sm"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.92)",
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${brandTokens.border}`,
                  }}
                >
                  <Text size="xs" fw={600}>
                    The Sunlit Summer Lookbook
                  </Text>
                  <Text size="11px" c={brandTokens.textSecondary}>
                    Organic Mulmul & Linen · Starting ₹899
                  </Text>
                </Paper>
              </Box>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* 2. SHOP BY CATEGORY */}
      <Box component="section" className="ku-section-padding" bg={brandTokens.bgSecondary}>
        <Container>
          <Group justify="space-between" align="flex-end" mb={32} wrap="wrap" gap="sm">
            <Box>
              <Text className="ku-eyebrow" mb={6}>
                Curated Wardrobe
              </Text>
              <Title order={2} className="ku-serif" fz={{ base: 28, md: 36 }}>
                Shop by Category
              </Title>
            </Box>
            <Button
              component={Link}
              href="/products"
              variant="subtle"
              color="espresso"
              rightSection={<IconArrowRight size={15} />}
            >
              Browse Full Catalogue
            </Button>
          </Group>

          <Grid gutter={{ base: 14, md: 20 }}>
            {SHOP_CATEGORIES.map((category) => (
              <Grid.Col key={category.id} span={{ base: 6, sm: 4, lg: 2 }}>
                <Link href={`/categories/${category.slug}`} style={{ display: "block", height: "100%" }}>
                  <Box
                    className="ku-card-hover"
                    bg={brandTokens.bgPrimary}
                    p={10}
                    style={{
                      borderRadius: 10,
                      border: `1px solid ${brandTokens.border}`,
                      height: "100%",
                    }}
                  >
                    <Box
                      bg={brandTokens.bgSubtle}
                      style={{
                        aspectRatio: "4 / 5",
                        borderRadius: 7,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className="ku-img-zoom"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center 20%",
                          display: "block",
                        }}
                      />
                    </Box>
                    <Stack gap={2} pt={10} pb={4} px={2}>
                      <Group justify="space-between" align="center" wrap="nowrap">
                        <Text fw={600} size="sm" c={brandTokens.textPrimary}>
                          {category.name}
                        </Text>
                        <Text size="11px" c={brandTokens.textSecondary}>
                          {category.itemCount}
                        </Text>
                      </Group>
                      <Text size="xs" c={brandTokens.textSecondary} lineClamp={1}>
                        {category.subtitle}
                      </Text>
                    </Stack>
                  </Box>
                </Link>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 3. SHOP BY AGE */}
      <Box
        component="section"
        py={{ base: 44, md: 56 }}
        bg={brandTokens.bgPrimary}
        style={{
          borderTop: `1px solid ${brandTokens.border}`,
          borderBottom: `1px solid ${brandTokens.border}`,
        }}
      >
        <Container>
          <Stack gap={6} ta="center" mb={28}>
            <Text className="ku-eyebrow">Designed to Grow With Them</Text>
            <Title order={2} className="ku-serif" fz={{ base: 26, md: 32 }}>
              Shop by Age
            </Title>
          </Stack>

          <Grid gutter="sm">
            {AGE_GROUPS.map((age) => (
              <Grid.Col key={age.id} span={{ base: 6, sm: 4, md: 2 }}>
                <Link href={`/products?age=${age.slug}`} style={{ display: "block", height: "100%" }}>
                  <Paper
                    className="ku-card-hover"
                    p="md"
                    radius="md"
                    bg={brandTokens.bgSecondary}
                    ta="center"
                    style={{
                      border: `1px solid ${brandTokens.border}`,
                      height: "100%",
                    }}
                  >
                    <Text className="ku-serif" fw={600} size="md" c={brandTokens.textPrimary}>
                      {age.label}
                    </Text>
                    <Text size="xs" c={brandTokens.textSecondary} mt={4}>
                      {age.caption}
                    </Text>
                  </Paper>
                </Link>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 4. NEW ARRIVALS */}
      <Box component="section" className="ku-section-padding" bg={brandTokens.bgSecondary}>
        <Container>
          <Group justify="space-between" align="flex-end" mb={28} wrap="wrap" gap="md">
            <Box>
              <Text className="ku-eyebrow" mb={6}>
                Just Landed
              </Text>
              <Title order={2} className="ku-serif" fz={{ base: 28, md: 36 }}>
                New Arrivals
              </Title>
            </Box>

            <SegmentedControl
              value={arrivalFilter}
              onChange={setArrivalFilter}
              data={["All", "Girls", "Boys", "Baby", "Ethnic"]}
              radius="sm"
              size="xs"
              color="espresso"
              styles={{
                root: {
                  backgroundColor: brandTokens.bgPrimary,
                  border: `1px solid ${brandTokens.border}`,
                },
              }}
            />
          </Group>

          <Grid gutter={{ base: 14, md: 20 }}>
            {newArrivals.map((product) => (
              <Grid.Col key={product.id} span={{ base: 12, xs: 6, md: 3 }}>
                <ProductCard
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              </Grid.Col>
            ))}
          </Grid>

          <Group justify="center" mt={36}>
            <Button
              component={Link}
              href="/categories/new-arrivals"
              variant="outline"
              color="espresso"
              size="md"
              rightSection={<IconArrowRight size={16} />}
            >
              View All New Arrivals
            </Button>
          </Group>
        </Container>
      </Box>

      {/* 5. FEATURED COLLECTIONS */}
      <Box
        id="featured-collections"
        component="section"
        className="ku-section-padding"
        bg={brandTokens.bgPrimary}
        style={{
          borderTop: `1px solid ${brandTokens.border}`,
          borderBottom: `1px solid ${brandTokens.border}`,
        }}
      >
        <Container>
          <Stack gap={6} mb={32}>
            <Text className="ku-eyebrow">Editorial Capsules</Text>
            <Title order={2} className="ku-serif" fz={{ base: 28, md: 36 }}>
              Featured Collections
            </Title>
          </Stack>

          <Grid gutter={{ base: 20, md: 28 }}>
            {FEATURED_COLLECTIONS.map((col) => (
              <Grid.Col key={col.id} span={{ base: 12, md: 6 }}>
                <Paper
                  className="ku-card-hover"
                  radius="md"
                  bg={brandTokens.bgSecondary}
                  p={{ base: 14, md: 18 }}
                  style={{ border: `1px solid ${brandTokens.border}`, height: "100%" }}
                >
                  <Grid gutter="lg" align="center">
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Box
                        bg={brandTokens.bgSubtle}
                        style={{
                          aspectRatio: "4 / 5",
                          borderRadius: 8,
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={col.image}
                          alt={col.title}
                          className="ku-img-zoom"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center 20%",
                            display: "block",
                          }}
                        />
                      </Box>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Stack gap="sm" py="xs">
                        <Text className="ku-eyebrow" c={brandTokens.accentWarm}>
                          {col.eyebrow}
                        </Text>
                        <Title order={3} className="ku-serif" fz={24} lh={1.25}>
                          {col.title}
                        </Title>
                        <Text size="sm" c={brandTokens.textSecondary} lh={1.65}>
                          {col.description}
                        </Text>
                        <Box pt={4}>
                          <Button
                            component={Link}
                            href={`/collections/${col.slug}`}
                            variant="outline"
                            color="espresso"
                            size="sm"
                            rightSection={<IconArrowRight size={14} />}
                          >
                            {col.ctaLabel}
                          </Button>
                        </Box>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                </Paper>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 6. BEST SELLERS */}
      <Box component="section" className="ku-section-padding" bg={brandTokens.bgSecondary}>
        <Container>
          <Group justify="space-between" align="flex-end" mb={32} wrap="wrap" gap="sm">
            <Box>
              <Text className="ku-eyebrow" mb={6}>
                Most Loved by Parents
              </Text>
              <Title order={2} className="ku-serif" fz={{ base: 28, md: 36 }}>
                Boutique Best Sellers
              </Title>
            </Box>
            <Button
              component={Link}
              href="/products?sort=best-sellers"
              variant="subtle"
              color="espresso"
              rightSection={<IconArrowRight size={15} />}
            >
              Shop Best Sellers
            </Button>
          </Group>

          <Grid gutter={{ base: 14, md: 20 }}>
            {bestSellers.map((product) => (
              <Grid.Col key={product.id} span={{ base: 12, xs: 6, md: 3 }}>
                <ProductCard
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 7. SEASONAL PROMOTIONAL BANNER */}
      <Box component="section" py={{ base: 36, md: 56 }} bg={brandTokens.bgPrimary}>
        <Container>
          <Paper
            radius="md"
            p={{ base: 24, md: 44 }}
            style={{
              backgroundColor: brandTokens.bgSubtle,
              border: `1px solid ${brandTokens.border}`,
            }}
          >
            <Grid gutter={{ base: 24, md: 40 }} align="center">
              <Grid.Col span={{ base: 12, md: 7 }}>
                <Stack gap="md">
                  <Group gap="xs">
                    <Badge bg={brandTokens.accentSage} c="#FFFFFF" radius="sm" size="sm">
                      Seasonal Privilege
                    </Badge>
                    <Text className="ku-eyebrow">Limited Time Offer</Text>
                  </Group>
                  <Title order={2} className="ku-serif" fz={{ base: 26, md: 34 }} lh={1.2}>
                    Celebrate Every Milestone — Enjoy 15% Off Festive & Knitwear Sets
                  </Title>
                  <Text size="sm" c={brandTokens.textSecondary} maw={520} lh={1.65}>
                    Refresh their wardrobe with our handloom festive capsules and soft
                    combed cotton knits. Valid across India on orders above ₹2,499.
                  </Text>
                  <Group gap="sm" wrap="wrap" pt={4}>
                    <Paper
                      px="md"
                      py={8}
                      radius="sm"
                      bg={brandTokens.bgSecondary}
                      style={{
                        border: `1px dashed ${brandTokens.accentWarm}`,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Text size="xs" c={brandTokens.textSecondary}>
                        Code:
                      </Text>
                      <Text size="sm" fw={700} style={{ letterSpacing: "0.08em" }}>
                        KUTTI15
                      </Text>
                      <ActionIcon
                        variant="subtle"
                        color="espresso"
                        size="sm"
                        aria-label="Copy coupon code KUTTI15"
                        onClick={handleCopyCoupon}
                      >
                        <IconCopy size={14} />
                      </ActionIcon>
                    </Paper>

                    <Button
                      component={Link}
                      href="/collections/little-festive-heirlooms"
                      color="espresso"
                      size="md"
                      rightSection={<IconArrowRight size={16} />}
                    >
                      Shop Seasonal Edit
                    </Button>
                  </Group>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 5 }}>
                <Box
                  bg={brandTokens.bgSecondary}
                  style={{
                    borderRadius: 10,
                    overflow: "hidden",
                    border: `1px solid ${brandTokens.border}`,
                    aspectRatio: "16 / 10",
                  }}
                >
                  <img
                    src="/images/promo-monsoon.jpg"
                    alt="Curated organic cotton knitwear and pastel children's garments"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Box>
              </Grid.Col>
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* 8. WHY CHOOSE KUTTI UDUPP */}
      <Box
        component="section"
        className="ku-section-padding"
        bg={brandTokens.bgSecondary}
        style={{ borderTop: `1px solid ${brandTokens.border}` }}
      >
        <Container>
          <Stack gap={6} ta="center" mb={40}>
            <Text className="ku-eyebrow">The Kutti Udupp Promise</Text>
            <Title order={2} className="ku-serif" fz={{ base: 26, md: 34 }}>
              Why Parents Trust Us
            </Title>
          </Stack>

          <Grid gutter="lg">
            {WHY_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Grid.Col key={item.title} span={{ base: 12, sm: 6, lg: 2.4 }}>
                  <Stack
                    gap="sm"
                    p="lg"
                    bg={brandTokens.bgPrimary}
                    style={{
                      borderRadius: 10,
                      border: `1px solid ${brandTokens.border}`,
                      height: "100%",
                    }}
                  >
                    <Box
                      w={42}
                      h={42}
                      bg={brandTokens.bgSecondary}
                      style={{
                        borderRadius: "50%",
                        border: `1px solid ${brandTokens.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={20} stroke={1.6} color={brandTokens.accentWarm} />
                    </Box>
                    <Text fw={600} size="sm">
                      {item.title}
                    </Text>
                    <Text size="xs" c={brandTokens.textSecondary} lh={1.6}>
                      {item.description}
                    </Text>
                  </Stack>
                </Grid.Col>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* 9. TESTIMONIALS */}
      <Box
        component="section"
        className="ku-section-padding"
        bg={brandTokens.bgPrimary}
        style={{
          borderTop: `1px solid ${brandTokens.border}`,
          borderBottom: `1px solid ${brandTokens.border}`,
        }}
      >
        <Container>
          <Stack gap={6} ta="center" mb={36}>
            <Text className="ku-eyebrow">Parent Stories</Text>
            <Title order={2} className="ku-serif" fz={{ base: 26, md: 34 }}>
              Loved Across Indian Homes
            </Title>
          </Stack>

          <Grid gutter="lg">
            {TESTIMONIALS.map((review) => (
              <Grid.Col key={review.id} span={{ base: 12, md: 4 }}>
                <Paper
                  p="xl"
                  radius="md"
                  bg={brandTokens.bgSecondary}
                  style={{
                    border: `1px solid ${brandTokens.border}`,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Stack gap="md">
                    <Rating value={review.rating} readOnly color="warm.5" size="sm" />
                    <Text size="sm" lh={1.7} c={brandTokens.textPrimary}>
                      &ldquo;{review.quote}&rdquo;
                    </Text>
                  </Stack>

                  <Box pt="md" mt="md" style={{ borderTop: `1px solid ${brandTokens.border}` }}>
                    <Text size="sm" fw={600}>
                      {review.parentName}
                    </Text>
                    <Text size="xs" c={brandTokens.textSecondary}>
                      {review.city} · {review.childAge}
                    </Text>
                    <Text size="11px" c={brandTokens.accentWarm} mt={4} fw={500}>
                      Verified Purchase: {review.purchasedItem}
                    </Text>
                  </Box>
                </Paper>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 10. NEWSLETTER */}
      <Box component="section" py={{ base: 56, md: 76 }} bg={brandTokens.bgSecondary}>
        <Container size={680}>
          <Stack gap="md" ta="center" align="center">
            <Text className="ku-eyebrow" c={brandTokens.accentWarm}>
              The Boutique Journal
            </Text>
            <Title order={2} className="ku-serif" fz={{ base: 26, md: 34 }}>
              Join the Kutti Udupp Family
            </Title>
            <Text size="sm" c={brandTokens.textSecondary} maw={480} lh={1.65}>
              Receive early invitations to limited handloom capsules, baby care guides,
              and a ₹250 welcome privilege on your first order.
            </Text>

            {subscribed ? (
              <Paper
                px="xl"
                py="md"
                radius="md"
                bg={brandTokens.bgPrimary}
                style={{ border: `1px solid ${brandTokens.accentSage}` }}
              >
                <Group gap="xs">
                  <IconCheck size={18} color={brandTokens.accentSage} />
                  <Text size="sm" fw={500}>
                    Thank you for subscribing! Use code <strong>KUTTI250</strong> on your first bag.
                  </Text>
                </Group>
              </Paper>
            ) : (
              <Box component="form" onSubmit={handleNewsletterSubmit} w="100%" maw={480} mt="xs">
                <Group gap="xs" wrap="nowrap" align="stretch">
                  <TextInput
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.currentTarget.value)}
                    size="md"
                    radius="sm"
                    style={{ flex: 1 }}
                    aria-label="Email address for newsletter"
                    styles={{
                      input: {
                        backgroundColor: brandTokens.bgPrimary,
                        borderColor: brandTokens.border,
                      },
                    }}
                  />
                  <Button type="submit" color="espresso" size="md" px="xl">
                    Subscribe
                  </Button>
                </Group>
                <Text size="11px" c={brandTokens.textSecondary} mt={8}>
                  Zero spam. Unsubscribe anytime in one click.
                </Text>
              </Box>
            )}
          </Stack>
        </Container>
      </Box>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
}
