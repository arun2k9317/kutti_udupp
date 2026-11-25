"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Grid,
  Group,
  Modal,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconHeart, IconShoppingBag } from "@tabler/icons-react";
import { ProductItem } from "@/data/catalog";
import { formatINR, getDiscountPercent } from "@/lib/format";
import { brandTokens } from "@/lib/theme";
import { useStorefrontStore } from "@/store/useStorefrontStore";

interface QuickViewModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const addToCart = useStorefrontStore((s) => s.addToCart);
  const setCartDrawerOpen = useStorefrontStore((s) => s.setCartDrawerOpen);
  const wishlistIds = useStorefrontStore((s) => s.wishlistIds);
  const toggleWishlist = useStorefrontStore((s) => s.toggleWishlist);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] ?? "");
      setSelectedColor(product.colors[0]?.name ?? "");
    }
  }, [product]);

  if (!product) return null;

  const discount = getDiscountPercent(product.pricePaise, product.compareAtPricePaise);
  const isWishlisted = wishlistIds.includes(product.id);

  const handleAddToBag = () => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      size: selectedSize || product.sizes[0],
      color: selectedColor || product.colors[0]?.name || "Default",
      pricePaise: product.pricePaise,
      compareAtPricePaise: product.compareAtPricePaise,
    });
    onClose();
    setCartDrawerOpen(true);
    notifications.show({
      title: "Added to your shopping bag",
      message: `${product.name} · Size ${selectedSize}`,
      color: "sage",
      icon: <IconCheck size={16} />,
    });
  };

  return (
    <Modal
      opened={Boolean(product)}
      onClose={onClose}
      size="xl"
      radius="md"
      padding="xl"
      title={
        <Text className="ku-eyebrow" c={brandTokens.textSecondary}>
          Quick View · {product.sku}
        </Text>
      }
      overlayProps={{ backgroundOpacity: 0.4, blur: 4 }}
    >
      <Grid gutter="xl" align="center">
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Box
            bg={brandTokens.bgSubtle}
            style={{
              aspectRatio: "4 / 5",
              borderRadius: 8,
              overflow: "hidden",
              border: `1px solid ${brandTokens.border}`,
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack gap="md">
            <Group gap="xs">
              <Badge variant="light" color="warm">
                {product.category}
              </Badge>
              <Badge variant="outline" color="espresso">
                {product.ageGroup}
              </Badge>
            </Group>

            <Text className="ku-serif" fw={600} fz={24} lh={1.25}>
              {product.name}
            </Text>

            <Group gap="sm" align="baseline">
              <Text fz={22} fw={700}>
                {formatINR(product.pricePaise)}
              </Text>
              {product.compareAtPricePaise && (
                <Text td="line-through" c={brandTokens.textSecondary} size="sm">
                  {formatINR(product.compareAtPricePaise)}
                </Text>
              )}
              {discount && (
                <Badge color="blush.4" c={brandTokens.textPrimary} size="sm">
                  Save {discount}%
                </Badge>
              )}
            </Group>

            <Text size="sm" c={brandTokens.textSecondary} lh={1.6}>
              {product.description}
            </Text>

            <Text size="xs" c={brandTokens.textSecondary}>
              <strong>Fabric:</strong> {product.fabric}
            </Text>

            {/* Colour Selector */}
            <Box>
              <Text size="xs" fw={600} mb={6}>
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
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        backgroundColor: c.hex,
                        border: active
                          ? `2px solid ${brandTokens.textPrimary}`
                          : `1px solid ${brandTokens.border}`,
                        outline: active ? "2px solid #FFFFFF" : "none",
                        outlineOffset: -3,
                      }}
                    />
                  );
                })}
              </Group>
            </Box>

            {/* Size Selector */}
            <Box>
              <Text size="xs" fw={600} mb={6}>
                Select Size
              </Text>
              <Group gap="xs">
                {product.sizes.map((size) => {
                  const active = size === selectedSize;
                  return (
                    <Button
                      key={size}
                      size="xs"
                      variant={active ? "filled" : "outline"}
                      color="espresso"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  );
                })}
              </Group>
            </Box>

            <Group gap="xs" mt="xs">
              <Button
                color="espresso"
                size="md"
                leftSection={<IconShoppingBag size={17} />}
                style={{ flex: 1 }}
                onClick={handleAddToBag}
              >
                Add to Bag
              </Button>
              <Button
                variant="outline"
                color="espresso"
                size="md"
                aria-label="Toggle wishlist"
                onClick={() => toggleWishlist(product.id)}
              >
                <IconHeart
                  size={18}
                  fill={isWishlisted ? brandTokens.accentBlush : "none"}
                  color={brandTokens.textPrimary}
                />
              </Button>
            </Group>

            <Button
              component={Link}
              href={`/products/${product.slug}`}
              variant="subtle"
              color="espresso"
              size="xs"
              onClick={onClose}
            >
              View Full Product Details & Size Guide →
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>
    </Modal>
  );
}
