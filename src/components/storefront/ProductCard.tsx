"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconEye, IconHeart, IconShoppingBag } from "@tabler/icons-react";
import { ProductItem } from "@/data/catalog";
import { formatINR, getDiscountPercent } from "@/lib/format";
import { brandTokens } from "@/lib/theme";
import { useStorefrontStore } from "@/store/useStorefrontStore";

interface ProductCardProps {
  product: ProductItem;
  onQuickView?: (product: ProductItem) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");

  const wishlistIds = useStorefrontStore((s) => s.wishlistIds);
  const toggleWishlist = useStorefrontStore((s) => s.toggleWishlist);
  const addToCart = useStorefrontStore((s) => s.addToCart);
  const setCartDrawerOpen = useStorefrontStore((s) => s.setCartDrawerOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isWishlisted = mounted && wishlistIds.includes(product.id);
  const discount = getDiscountPercent(product.pricePaise, product.compareAtPricePaise);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product.id);
    notifications.show({
      title: added ? "Saved to wishlist" : "Removed from wishlist",
      message: product.name,
      color: added ? "blush" : "gray",
    });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      size: selectedSize || product.sizes[0],
      color: product.colors[0]?.name ?? "Classic",
      pricePaise: product.pricePaise,
      compareAtPricePaise: product.compareAtPricePaise,
    });
    setCartDrawerOpen(true);
    notifications.show({
      title: "Added to shopping bag",
      message: `${product.name} · Size ${selectedSize || product.sizes[0]}`,
      color: "sage",
      icon: <IconCheck size={16} />,
    });
  };

  return (
    <Box
      className="ku-card-hover"
      bg={brandTokens.bgSecondary}
      p={12}
      style={{
        borderRadius: 10,
        border: `1px solid ${brandTokens.border}`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Frame */}
      <Box
        pos="relative"
        bg={brandTokens.bgSubtle}
        style={{
          aspectRatio: "4 / 5",
          borderRadius: 7,
          overflow: "hidden",
        }}
      >
        <Link href={`/products/${product.slug}`} style={{ display: "block", height: "100%" }}>
          <img
            src={product.image}
            alt={product.name}
            className="ku-img-zoom"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          {product.secondaryImage && (
            <img
              src={product.secondaryImage}
              alt={`${product.name} alternate view`}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: hovered ? 1 : 0,
                transition: "opacity 360ms ease",
              }}
            />
          )}
        </Link>

        {/* Top-left badges */}
        <Group gap={6} pos="absolute" top={10} left={10} style={{ zIndex: 2 }}>
          {discount && (
            <Badge
              size="xs"
              radius="sm"
              bg={brandTokens.accentBlush}
              c={brandTokens.textPrimary}
            >
              -{discount}%
            </Badge>
          )}
          {product.badge && (
            <Badge
              size="xs"
              radius="sm"
              bg="rgba(255,255,255,0.92)"
              c={brandTokens.textPrimary}
              style={{ border: `1px solid ${brandTokens.border}` }}
            >
              {product.badge}
            </Badge>
          )}
        </Group>

        {/* Top-right Wishlist control */}
        <ActionIcon
          pos="absolute"
          top={10}
          right={10}
          radius="xl"
          size="md"
          variant="filled"
          bg="rgba(255, 255, 255, 0.9)"
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          onClick={handleToggleWishlist}
          style={{
            zIndex: 2,
            border: `1px solid ${brandTokens.border}`,
            color: isWishlisted ? "#B46B6B" : brandTokens.textPrimary,
          }}
        >
          <IconHeart
            size={16}
            stroke={1.7}
            fill={isWishlisted ? "#EBCBCB" : "none"}
          />
        </ActionIcon>

        {/* Bottom quick actions */}
        <Group
          pos="absolute"
          bottom={10}
          left={10}
          right={10}
          gap={6}
          style={{
            zIndex: 2,
            opacity: hovered ? 1 : 0.94,
            transition: "opacity 200ms ease",
          }}
        >
          <Button
            size="xs"
            radius="sm"
            color="espresso"
            leftSection={<IconShoppingBag size={13} />}
            style={{ flex: 1, backgroundColor: "rgba(53, 49, 47, 0.92)" }}
            onClick={handleQuickAdd}
          >
            Add ({selectedSize})
          </Button>
          {onQuickView && (
            <ActionIcon
              size={30}
              radius="sm"
              bg="rgba(255, 255, 255, 0.94)"
              c={brandTokens.textPrimary}
              aria-label={`Quick view ${product.name}`}
              style={{ border: `1px solid ${brandTokens.border}` }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
            >
              <IconEye size={15} stroke={1.7} />
            </ActionIcon>
          )}
        </Group>
      </Box>

      {/* Card Body */}
      <Stack gap={6} pt={12} style={{ flex: 1, justifyContent: "space-between" }}>
        <Box>
          <Group justify="space-between" align="center" mb={4}>
            <Text size="11px" fw={600} tt="uppercase" c={brandTokens.textSecondary} style={{ letterSpacing: "0.08em" }}>
              {product.gender} · {product.ageGroup}
            </Text>
            <Group gap={4}>
              {product.colors.map((c) => (
                <Box
                  key={c.name}
                  title={c.name}
                  w={10}
                  h={10}
                  style={{
                    borderRadius: "50%",
                    backgroundColor: c.hex,
                    border: `1px solid ${brandTokens.border}`,
                  }}
                />
              ))}
            </Group>
          </Group>

          <Link href={`/products/${product.slug}`}>
            <Text
              fw={500}
              size="sm"
              lh={1.4}
              lineClamp={2}
              style={{ minHeight: "2.8em", color: brandTokens.textPrimary }}
            >
              {product.name}
            </Text>
          </Link>
        </Box>

        <Stack gap={8} pt={4}>
          {/* Price Row */}
          <Group gap={8} align="baseline">
            <Text fw={700} size="sm" c={brandTokens.textPrimary}>
              {formatINR(product.pricePaise)}
            </Text>
            {product.compareAtPricePaise && (
              <Text size="xs" td="line-through" c={brandTokens.textSecondary}>
                {formatINR(product.compareAtPricePaise)}
              </Text>
            )}
          </Group>

          {/* Available size preview pills */}
          <Group gap={4} wrap="wrap">
            {product.sizes.map((size) => {
              const active = size === selectedSize;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  style={{
                    cursor: "pointer",
                    fontSize: "0.68rem",
                    fontWeight: active ? 600 : 500,
                    padding: "2px 6px",
                    borderRadius: 4,
                    border: `1px solid ${
                      active ? brandTokens.textPrimary : brandTokens.border
                    }`,
                    backgroundColor: active
                      ? brandTokens.bgSubtle
                      : brandTokens.bgSecondary,
                    color: brandTokens.textPrimary,
                  }}
                >
                  {size}
                </button>
              );
            })}
          </Group>
        </Stack>
      </Stack>
    </Box>
  );
}
