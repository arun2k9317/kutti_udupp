"use client";

import Link from "next/link";
import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Container,
  Divider,
  Grid,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandPinterest,
  IconBrandYoutube,
  IconMail,
  IconMapPin,
  IconPhone,
  IconShieldLock,
} from "@tabler/icons-react";
import { brandTokens } from "@/lib/theme";

const SHOP_LINKS = [
  { label: "Shop Boys", href: "/categories/boys" },
  { label: "Shop Girls", href: "/categories/girls" },
  { label: "Baby Collection", href: "/categories/baby-clothing" },
  { label: "Dresses & Frocks", href: "/categories/dresses" },
  { label: "Ethnic Wear", href: "/categories/ethnic-wear" },
  { label: "New Arrivals", href: "/categories/new-arrivals" },
];

const CARE_LINKS = [
  { label: "About Kutti Udupp", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Shipping Policy", href: "/policies/shipping" },
  { label: "Returns & Exchanges", href: "/policies/returns" },
  { label: "Privacy Policy", href: "/policies/privacy" },
  { label: "Terms & Conditions", href: "/policies/terms" },
];

export function StoreFooter() {
  return (
    <Box
      component="footer"
      bg={brandTokens.bgSubtle}
      style={{ borderTop: `1px solid ${brandTokens.border}` }}
      pt={64}
      pb={36}
    >
      <Container>
        <Grid gutter={{ base: 36, md: 48 }}>
          {/* Brand Story Column */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Text
                className="ku-serif"
                fw={600}
                fz={24}
                style={{ letterSpacing: "0.06em" }}
              >
                KUTTI UDUPP
              </Text>
              <Text size="sm" c={brandTokens.textSecondary} maw={340} lh={1.65}>
                An independent Indian children&apos;s fashion boutique crafting gentle,
                breathable cotton, linen, and handloom outfits designed for happy
                childhood memories.
              </Text>
              <Group gap="xs" mt={4}>
                <ActionIcon
                  component="a"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  variant="light"
                  color="espresso"
                  radius="xl"
                  size="lg"
                  aria-label="Kutti Udupp on Instagram"
                >
                  <IconBrandInstagram size={18} stroke={1.6} />
                </ActionIcon>
                <ActionIcon
                  component="a"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  variant="light"
                  color="espresso"
                  radius="xl"
                  size="lg"
                  aria-label="Kutti Udupp on Facebook"
                >
                  <IconBrandFacebook size={18} stroke={1.6} />
                </ActionIcon>
                <ActionIcon
                  component="a"
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer"
                  variant="light"
                  color="espresso"
                  radius="xl"
                  size="lg"
                  aria-label="Kutti Udupp on Pinterest"
                >
                  <IconBrandPinterest size={18} stroke={1.6} />
                </ActionIcon>
                <ActionIcon
                  component="a"
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  variant="light"
                  color="espresso"
                  radius="xl"
                  size="lg"
                  aria-label="Kutti Udupp on YouTube"
                >
                  <IconBrandYoutube size={18} stroke={1.6} />
                </ActionIcon>
              </Group>
            </Stack>
          </Grid.Col>

          {/* Shop Links */}
          <Grid.Col span={{ base: 6, sm: 4, md: 2.5 }}>
            <Stack gap="sm">
              <Text className="ku-eyebrow" c={brandTokens.textPrimary}>
                Shop
              </Text>
              <Stack gap={9}>
                {SHOP_LINKS.map((link) => (
                  <Anchor
                    key={link.href}
                    component={Link}
                    href={link.href}
                    size="sm"
                    c={brandTokens.textSecondary}
                    underline="hover"
                  >
                    {link.label}
                  </Anchor>
                ))}
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Customer Care Links */}
          <Grid.Col span={{ base: 6, sm: 4, md: 2.5 }}>
            <Stack gap="sm">
              <Text className="ku-eyebrow" c={brandTokens.textPrimary}>
                Customer Care
              </Text>
              <Stack gap={9}>
                {CARE_LINKS.map((link) => (
                  <Anchor
                    key={link.href}
                    component={Link}
                    href={link.href}
                    size="sm"
                    c={brandTokens.textSecondary}
                    underline="hover"
                  >
                    {link.label}
                  </Anchor>
                ))}
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Contact & Store Trust */}
          <Grid.Col span={{ base: 12, sm: 4, md: 3 }}>
            <Stack gap="sm">
              <Text className="ku-eyebrow" c={brandTokens.textPrimary}>
                Studio & Support
              </Text>
              <Stack gap={10}>
                <Group gap="xs" align="flex-start" wrap="nowrap">
                  <IconMapPin size={16} color={brandTokens.accentWarm} style={{ marginTop: 2, flexShrink: 0 }} />
                  <Text size="sm" c={brandTokens.textSecondary} lh={1.5}>
                    Indiranagar 12th Main, Bengaluru 560038 — Shipping Pan-India
                  </Text>
                </Group>
                <Group gap="xs" align="center" wrap="nowrap">
                  <IconMail size={16} color={brandTokens.accentWarm} style={{ flexShrink: 0 }} />
                  <Anchor href="mailto:care@kuttiudupp.in" size="sm" c={brandTokens.textSecondary}>
                    care@kuttiudupp.in
                  </Anchor>
                </Group>
                <Group gap="xs" align="center" wrap="nowrap">
                  <IconPhone size={16} color={brandTokens.accentWarm} style={{ flexShrink: 0 }} />
                  <Text size="sm" c={brandTokens.textSecondary}>
                    +91 80 4123 7890 (Mon–Sat, 10am–6pm)
                  </Text>
                </Group>
                <Group gap="xs" mt={4}>
                  <Badge
                    variant="outline"
                    color="espresso"
                    size="sm"
                    leftSection={<IconShieldLock size={12} />}
                  >
                    UPI & Razorpay Secured
                  </Badge>
                </Group>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider color={brandTokens.border} my={32} />

        <Group justify="space-between" align="center" wrap="wrap" gap="sm">
          <Text size="xs" c={brandTokens.textSecondary}>
            © {new Date().getFullYear()} Kutti Udupp Children&apos;s Boutique. All rights reserved.
          </Text>
          <Group gap="md">
            <Anchor component={Link} href="/admin/dashboard" size="xs" c={brandTokens.textSecondary}>
              Admin Studio
            </Anchor>
            <Text size="xs" c={brandTokens.textSecondary}>
              Prices inclusive of applicable Indian GST
            </Text>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
