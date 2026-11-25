"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconHeart, IconShoppingBag } from "@tabler/icons-react";
import { ProductItem } from "@/data/catalog";
import { formatINR, getDiscountPercent } from "@/lib/format";
import { brandTokens } from "@/lib/theme";
import { useStorefrontStore } from "@/store/useStorefrontStore";

export function ProductDetailView({ product }: { product: ProductItem }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "");
  const addToCart = useStorefrontStore((s) => s.addToCart);
  const setCartDrawerOpen = useStorefrontStore((s) => s.setCartDrawerOpen);
  const wishlistIds = useStorefrontStore((s) => s.wishlistIds);
  const toggleWishlist = useStorefrontStore((s) => s.toggleWishlist);

  const isWishlisted = wishlistIds.includes(product.id);
  const discount = getDiscountPercent(product.pricePaise, product.compareAtPricePaise);

  const handleAdd = () => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      pricePaise: product.pricePaise,
      compareAtPricePaise: product.compareAtPricePaise,
    });
    setCartDrawerOpen(true);
    notifications.show({
      title: "Added to bag",
      message: `${product.name} · Size ${selectedSize}`,
      color: "sage",
      icon: <IconCheck size={16} />,
    });
  };

  return (
    <Box py={{ base: 32, md: 56 }} bg={brandTokens.bgPrimary}>
      <Container>
        <Breadcrumbs mb="lg" separator="/">
          <Link href="/" style={{ fontSize: "0.8rem", color: brandTokens.textSecondary }}>
            Home
          </Link>
          <Link
            href={`/categories/${product.categorySlug}`}
            style={{ fontSize: "0.8rem", color: brandTokens.textSecondary }}
          >
            {product.category}
          </Link>
          <Text size="xs" fw={600}>
            {product.name}
          </Text>
        </Breadcrumbs>

        <Grid gutter={{ base: 24, md: 48 }} align="flex-start">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper
              p="sm"
              radius="md"
              bg={brandTokens.bgSecondary}
              style={{ border: `1px solid ${brandTokens.border}` }}
            >
              <Box
                bg={brandTokens.bgSubtle}
                style={{ aspectRatio: "4 / 5", borderRadius: 8, overflow: "hidden" }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <Group gap="xs">
                <Badge variant="light" color="warm">
                  {product.category}
                </Badge>
                <Badge variant="outline" color="espresso">
                  {product.ageGroup}
                </Badge>
                <Text size="xs" c={brandTokens.textSecondary}>
                  SKU: {product.sku}
                </Text>
              </Group>

              <Title order={1} className="ku-serif" fz={{ base: 26, md: 34 }}>
                {product.name}
              </Title>

              <Group gap="sm" align="baseline">
                <Text fz={26} fw={700}>
                  {formatINR(product.pricePaise)}
                </Text>
                {product.compareAtPricePaise && (
                  <Text td="line-through" c={brandTokens.textSecondary} size="md">
                    {formatINR(product.compareAtPricePaise)}
                  </Text>
                )}
                {discount && (
                  <Badge bg={brandTokens.accentBlush} c={brandTokens.textPrimary}>
                    Save {discount}%
                  </Badge>
                )}
              </Group>

              <Text size="sm" c={brandTokens.textSecondary} lh={1.65}>
                {product.description}
              </Text>

              <Divider color={brandTokens.border} />

              <Box>
                <Text size="xs" fw={600} mb={8}>
                  Colour: <span style={{ fontWeight: 400 }}>{selectedColor}</span>
                </Text>
                <Group gap="xs">
                  {product.colors.map((c) => {
                    const active = c.name === selectedColor;
                    return (
                      <UnstyledButton
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        aria-label={`Select colour ${c.name}`}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          backgroundColor: c.hex,
                          border: active
                            ? `2px solid ${brandTokens.textPrimary}`
                            : `1px solid ${brandTokens.border}`,
                        }}
                      />
                    );
                  })}
                </Group>
              </Box>

              <Box>
                <Text size="xs" fw={600} mb={8}>
                  Select Size
                </Text>
                <Group gap="xs">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      size="sm"
                      variant={size === selectedSize ? "filled" : "outline"}
                      color="espresso"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </Group>
              </Box>

              <Group gap="sm" pt="xs">
                <Button
                  size="lg"
                  color="espresso"
                  leftSection={<IconShoppingBag size={18} />}
                  style={{ flex: 1 }}
                  onClick={handleAdd}
                >
                  Add to Bag
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  color="espresso"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <IconHeart
                    size={18}
                    fill={isWishlisted ? brandTokens.accentBlush : "none"}
                  />
                </Button>
              </Group>

              <Paper
                p="md"
                radius="md"
                bg={brandTokens.bgSecondary}
                style={{ border: `1px solid ${brandTokens.border}` }}
              >
                <Stack gap={6}>
                  <Text size="xs">
                    <strong>Fabric:</strong> {product.fabric}
                  </Text>
                  <Text size="xs" c={brandTokens.textSecondary}>
                    Gentle cold wash · Dispatched within 24 hours · 14-day size exchange
                  </Text>
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
