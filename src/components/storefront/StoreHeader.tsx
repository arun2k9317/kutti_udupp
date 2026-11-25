"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ActionIcon,
  Badge,
  Box,
  Burger,
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  Indicator,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconHeart,
  IconSearch,
  IconShoppingBag,
  IconUser,
} from "@tabler/icons-react";
import { useStorefrontStore } from "@/store/useStorefrontStore";
import { brandTokens } from "@/lib/theme";

const PRIMARY_NAV = [
  { label: "Shop Boys", href: "/categories/boys" },
  { label: "Shop Girls", href: "/categories/girls" },
  { label: "Baby Collection", href: "/categories/baby-clothing" },
  { label: "New Arrivals", href: "/categories/new-arrivals" },
  { label: "Ethnic Wear", href: "/categories/ethnic-wear" },
  { label: "All Products", href: "/products" },
];

export function StoreHeader() {
  const [mobileMenuOpened, { open: openMobileMenu, close: closeMobileMenu }] =
    useDisclosure(false);
  const [mounted, setMounted] = useState(false);

  const cart = useStorefrontStore((s) => s.cart);
  const wishlistIds = useStorefrontStore((s) => s.wishlistIds);
  const setCartDrawerOpen = useStorefrontStore((s) => s.setCartDrawerOpen);
  const setWishlistDrawerOpen = useStorefrontStore((s) => s.setWishlistDrawerOpen);
  const setSearchModalOpen = useStorefrontStore((s) => s.setSearchModalOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalCartItems = mounted
    ? cart.reduce((sum, item) => sum + item.quantity, 0)
    : 0;
  const totalWishlistItems = mounted ? wishlistIds.length : 0;

  return (
    <>
      <Box
        component="header"
        pos="sticky"
        top={0}
        style={{
          zIndex: 100,
          backgroundColor: "rgba(248, 245, 240, 0.94)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${brandTokens.border}`,
        }}
      >
        <Container>
          <Group justify="space-between" align="center" h={72} wrap="nowrap">
            {/* Left: Mobile Burger + Brand Wordmark */}
            <Group gap="sm" align="center" wrap="nowrap">
              <Burger
                opened={mobileMenuOpened}
                onClick={openMobileMenu}
                hiddenFrom="md"
                size="sm"
                color={brandTokens.textPrimary}
                aria-label="Open navigation menu"
              />

              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: 8,
                }}
              >
                <Text
                  component="span"
                  className="ku-serif"
                  fw={600}
                  style={{
                    fontSize: "clamp(1.25rem, 2.2vw, 1.55rem)",
                    letterSpacing: "0.06em",
                    color: brandTokens.textPrimary,
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  KUTTI UDUPP
                </Text>
                <Text
                  component="span"
                  visibleFrom="sm"
                  size="10px"
                  fw={600}
                  tt="uppercase"
                  c={brandTokens.accentWarm}
                  style={{ letterSpacing: "0.18em" }}
                >
                  Boutique
                </Text>
              </Link>
            </Group>

            {/* Center: Desktop Horizontal Navigation */}
            <Group component="nav" aria-label="Main navigation" visibleFrom="md" gap={26}>
              {PRIMARY_NAV.map((item) => (
                <Link key={item.href} href={item.href} className="ku-nav-link">
                  {item.label}
                </Link>
              ))}
            </Group>

            {/* Right: Search, Account, Wishlist, Cart */}
            <Group gap={6} align="center" wrap="nowrap">
              <ActionIcon
                variant="subtle"
                color="espresso"
                size="lg"
                radius="xl"
                aria-label="Search store"
                onClick={() => setSearchModalOpen(true)}
              >
                <IconSearch size={20} stroke={1.65} />
              </ActionIcon>

              <ActionIcon
                component={Link}
                href="/account"
                variant="subtle"
                color="espresso"
                size="lg"
                radius="xl"
                aria-label="Customer account"
                visibleFrom="xs"
              >
                <IconUser size={20} stroke={1.65} />
              </ActionIcon>

              <Indicator
                label={totalWishlistItems}
                size={17}
                disabled={totalWishlistItems === 0}
                color="blush.4"
                styles={{
                  indicator: {
                    color: brandTokens.textPrimary,
                    fontWeight: 600,
                    fontSize: 10,
                    border: `1px solid ${brandTokens.bgPrimary}`,
                  },
                }}
              >
                <ActionIcon
                  variant="subtle"
                  color="espresso"
                  size="lg"
                  radius="xl"
                  aria-label="Open wishlist"
                  onClick={() => setWishlistDrawerOpen(true)}
                >
                  <IconHeart size={20} stroke={1.65} />
                </ActionIcon>
              </Indicator>

              <Indicator
                label={totalCartItems}
                size={17}
                disabled={totalCartItems === 0}
                color="warm.5"
                styles={{
                  indicator: {
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: 10,
                    border: `1px solid ${brandTokens.bgPrimary}`,
                  },
                }}
              >
                <ActionIcon
                  variant="subtle"
                  color="espresso"
                  size="lg"
                  radius="xl"
                  aria-label="Open shopping bag"
                  onClick={() => setCartDrawerOpen(true)}
                >
                  <IconShoppingBag size={20} stroke={1.65} />
                </ActionIcon>
              </Indicator>
            </Group>
          </Group>
        </Container>
      </Box>

      {/* Mobile Navigation Drawer */}
      <Drawer
        opened={mobileMenuOpened}
        onClose={closeMobileMenu}
        size="82%"
        maw={340}
        title={
          <Text className="ku-serif" fw={600} size="lg" style={{ letterSpacing: "0.06em" }}>
            KUTTI UDUPP
          </Text>
        }
      >
        <Stack gap="md" pt="md">
          <Button
            variant="light"
            color="warm"
            leftSection={<IconSearch size={16} />}
            justify="flex-start"
            onClick={() => {
              closeMobileMenu();
              setSearchModalOpen(true);
            }}
          >
            Search dresses, shirts, age...
          </Button>

          <Stack gap={4}>
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                style={{
                  padding: "11px 6px",
                  borderBottom: `1px solid ${brandTokens.border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.98rem",
                  fontWeight: 500,
                }}
              >
                <span>{item.label}</span>
                {item.label === "New Arrivals" && (
                  <Badge size="xs" color="blush.3" c={brandTokens.textPrimary}>
                    New
                  </Badge>
                )}
              </Link>
            ))}
          </Stack>

          <Divider color={brandTokens.border} />

          <Stack gap="xs">
            <Button
              component={Link}
              href="/account"
              onClick={closeMobileMenu}
              variant="outline"
              color="espresso"
              leftSection={<IconUser size={16} />}
              fullWidth
            >
              My Account & Orders
            </Button>
            <Button
              variant="subtle"
              color="espresso"
              leftSection={<IconHeart size={16} />}
              fullWidth
              onClick={() => {
                closeMobileMenu();
                setWishlistDrawerOpen(true);
              }}
            >
              Saved Wishlist ({totalWishlistItems})
            </Button>
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
}
