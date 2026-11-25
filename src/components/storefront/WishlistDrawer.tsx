"use client";

import Link from "next/link";
import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  Group,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconHeart, IconShoppingBag, IconTrash } from "@tabler/icons-react";
import { SAMPLE_PRODUCTS } from "@/data/catalog";
import { formatINR } from "@/lib/format";
import { brandTokens } from "@/lib/theme";
import { useStorefrontStore } from "@/store/useStorefrontStore";

export function WishlistDrawer() {
  const opened = useStorefrontStore((s) => s.wishlistDrawerOpen);
  const setOpened = useStorefrontStore((s) => s.setWishlistDrawerOpen);
  const wishlistIds = useStorefrontStore((s) => s.wishlistIds);
  const toggleWishlist = useStorefrontStore((s) => s.toggleWishlist);
  const addToCart = useStorefrontStore((s) => s.addToCart);
  const setCartDrawerOpen = useStorefrontStore((s) => s.setCartDrawerOpen);

  const savedProducts = SAMPLE_PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      position="right"
      size="md"
      title={
        <Group gap="xs">
          <IconHeart size={18} stroke={1.7} />
          <Text className="ku-serif" fw={600} size="lg">
            Saved Wishlist
          </Text>
          <Text size="xs" c={brandTokens.textSecondary}>
            ({savedProducts.length})
          </Text>
        </Group>
      }
    >
      {savedProducts.length === 0 ? (
        <Stack align="center" justify="center" gap="md" py={80} ta="center">
          <Box
            w={60}
            h={60}
            bg={brandTokens.bgPrimary}
            style={{
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconHeart size={26} stroke={1.4} color={brandTokens.textSecondary} />
          </Box>
          <Stack gap={4}>
            <Text className="ku-serif" fw={600} size="lg">
              No saved outfits yet
            </Text>
            <Text size="sm" c={brandTokens.textSecondary} maw={260}>
              Tap the heart icon on any outfit you love to save it for later.
            </Text>
          </Stack>
          <Button
            component={Link}
            href="/products"
            color="espresso"
            onClick={() => setOpened(false)}
          >
            Browse Boutique
          </Button>
        </Stack>
      ) : (
        <ScrollArea h="calc(100vh - 100px)" pr="xs">
          <Stack gap="md" pt="md">
            {savedProducts.map((product) => (
              <Group
                key={product.id}
                align="flex-start"
                wrap="nowrap"
                gap="sm"
                pb="md"
                style={{ borderBottom: `1px solid ${brandTokens.border}` }}
              >
                <Box
                  w={72}
                  h={88}
                  bg={brandTokens.bgSubtle}
                  style={{ borderRadius: 6, overflow: "hidden", flexShrink: 0 }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>

                <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                  <Group justify="space-between" wrap="nowrap" gap="xs">
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={() => setOpened(false)}
                      style={{ fontSize: "0.9rem", fontWeight: 500 }}
                    >
                      {product.name}
                    </Link>
                    <ActionIcon
                      variant="subtle"
                      color="gray"
                      size="sm"
                      aria-label={`Remove ${product.name} from wishlist`}
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <IconTrash size={14} />
                    </ActionIcon>
                  </Group>

                  <Text size="xs" c={brandTokens.textSecondary}>
                    {product.category} · {product.ageGroup}
                  </Text>

                  <Group justify="space-between" align="center" mt={4}>
                    <Text size="sm" fw={600}>
                      {formatINR(product.pricePaise)}
                    </Text>

                    <Button
                      size="xs"
                      variant="light"
                      color="espresso"
                      leftSection={<IconShoppingBag size={13} />}
                      onClick={() => {
                        addToCart({
                          productId: product.id,
                          slug: product.slug,
                          name: product.name,
                          image: product.image,
                          size: product.sizes[0] ?? "2-4Y",
                          color: product.colors[0]?.name ?? "Classic",
                          pricePaise: product.pricePaise,
                          compareAtPricePaise: product.compareAtPricePaise,
                        });
                        setOpened(false);
                        setCartDrawerOpen(true);
                        notifications.show({
                          title: "Added to bag",
                          message: `${product.name} (${product.sizes[0]}) added.`,
                          color: "sage",
                        });
                      }}
                    >
                      Move to Bag
                    </Button>
                  </Group>
                </Stack>
              </Group>
            ))}
          </Stack>
        </ScrollArea>
      )}
    </Drawer>
  );
}
