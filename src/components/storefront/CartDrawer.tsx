"use client";

import Link from "next/link";
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Drawer,
  Group,
  Progress,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconMinus,
  IconPlus,
  IconShoppingBag,
  IconTrash,
  IconTruck,
} from "@tabler/icons-react";
import { useStorefrontStore } from "@/store/useStorefrontStore";
import { formatINR } from "@/lib/format";
import { brandTokens } from "@/lib/theme";

const FREE_SHIPPING_THRESHOLD_PAISE = 149900;

export function CartDrawer() {
  const opened = useStorefrontStore((s) => s.cartDrawerOpen);
  const setOpened = useStorefrontStore((s) => s.setCartDrawerOpen);
  const cart = useStorefrontStore((s) => s.cart);
  const updateQuantity = useStorefrontStore((s) => s.updateQuantity);
  const removeFromCart = useStorefrontStore((s) => s.removeFromCart);

  const subtotalPaise = cart.reduce(
    (sum, item) => sum + item.pricePaise * item.quantity,
    0
  );
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD_PAISE - subtotalPaise
  );
  const progressValue = Math.min(
    100,
    Math.round((subtotalPaise / FREE_SHIPPING_THRESHOLD_PAISE) * 100)
  );
  const shippingPaise =
    subtotalPaise === 0 || subtotalPaise >= FREE_SHIPPING_THRESHOLD_PAISE
      ? 0
      : 9900;

  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      position="right"
      size="md"
      title={
        <Group gap="xs">
          <IconShoppingBag size={18} stroke={1.7} />
          <Text className="ku-serif" fw={600} size="lg">
            Your Shopping Bag
          </Text>
          <Text size="xs" c={brandTokens.textSecondary}>
            ({cart.reduce((sum, i) => sum + i.quantity, 0)})
          </Text>
        </Group>
      }
      styles={{
        body: {
          height: "calc(100% - 62px)",
          display: "flex",
          flexDirection: "column",
          padding: 0,
        },
      }}
    >
      {/* Free Shipping Bar */}
      <Box px="lg" py="sm" bg={brandTokens.bgPrimary} style={{ borderBottom: `1px solid ${brandTokens.border}` }}>
        <Group gap={6} mb={6}>
          <IconTruck size={15} color={brandTokens.accentWarm} />
          <Text size="xs" fw={500}>
            {remainingForFreeShipping === 0 && subtotalPaise > 0
              ? "You unlocked complimentary India-wide shipping!"
              : `Add ${formatINR(remainingForFreeShipping)} more for complimentary shipping`}
          </Text>
        </Group>
        <Progress
          value={progressValue}
          size="xs"
          radius="xl"
          color="sage.5"
          bg={brandTokens.border}
        />
      </Box>

      {cart.length === 0 ? (
        <Stack
          align="center"
          justify="center"
          gap="md"
          p="xl"
          style={{ flex: 1 }}
          ta="center"
        >
          <Box
            w={64}
            h={64}
            bg={brandTokens.bgPrimary}
            style={{
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconShoppingBag size={28} stroke={1.4} color={brandTokens.textSecondary} />
          </Box>
          <Stack gap={4}>
            <Text className="ku-serif" fw={600} size="lg">
              Your bag is empty
            </Text>
            <Text size="sm" c={brandTokens.textSecondary} maw={260}>
              Explore our organic cottons, linen shirts, and heirloom festive outfits.
            </Text>
          </Stack>
          <Button
            component={Link}
            href="/products"
            color="espresso"
            onClick={() => setOpened(false)}
          >
            Explore New Arrivals
          </Button>
        </Stack>
      ) : (
        <>
          <ScrollArea style={{ flex: 1 }} px="lg" py="md">
            <Stack gap="md">
              {cart.map((item) => (
                <Group
                  key={`${item.productId}-${item.size}-${item.color}`}
                  align="flex-start"
                  wrap="nowrap"
                  gap="sm"
                  pb="md"
                  style={{ borderBottom: `1px solid ${brandTokens.border}` }}
                >
                  <Box
                    w={74}
                    h={90}
                    bg={brandTokens.bgSubtle}
                    style={{ borderRadius: 6, overflow: "hidden", flexShrink: 0 }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>

                  <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                    <Group justify="space-between" align="flex-start" wrap="nowrap" gap="xs">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={() => setOpened(false)}
                        style={{ fontSize: "0.9rem", fontWeight: 500, lineHeight: 1.35 }}
                      >
                        {item.name}
                      </Link>
                      <ActionIcon
                        variant="subtle"
                        color="gray"
                        size="sm"
                        aria-label={`Remove ${item.name}`}
                        onClick={() =>
                          removeFromCart(item.productId, item.size, item.color)
                        }
                      >
                        <IconTrash size={14} />
                      </ActionIcon>
                    </Group>

                    <Text size="xs" c={brandTokens.textSecondary}>
                      Size: {item.size} · {item.color}
                    </Text>

                    <Group justify="space-between" align="center" mt={4}>
                      <Group
                        gap={4}
                        px={4}
                        py={2}
                        style={{
                          border: `1px solid ${brandTokens.border}`,
                          borderRadius: 6,
                        }}
                      >
                        <ActionIcon
                          variant="subtle"
                          color="espresso"
                          size="xs"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.color,
                              item.quantity - 1
                            )
                          }
                        >
                          <IconMinus size={12} />
                        </ActionIcon>
                        <Text size="xs" fw={600} w={20} ta="center">
                          {item.quantity}
                        </Text>
                        <ActionIcon
                          variant="subtle"
                          color="espresso"
                          size="xs"
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.color,
                              item.quantity + 1
                            )
                          }
                        >
                          <IconPlus size={12} />
                        </ActionIcon>
                      </Group>

                      <Text size="sm" fw={600}>
                        {formatINR(item.pricePaise * item.quantity)}
                      </Text>
                    </Group>
                  </Stack>
                </Group>
              ))}
            </Stack>
          </ScrollArea>

          <Box
            p="lg"
            bg={brandTokens.bgPrimary}
            style={{ borderTop: `1px solid ${brandTokens.border}` }}
          >
            <Stack gap={8} mb="md">
              <Group justify="space-between">
                <Text size="sm" c={brandTokens.textSecondary}>
                  Subtotal
                </Text>
                <Text size="sm" fw={600}>
                  {formatINR(subtotalPaise)}
                </Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm" c={brandTokens.textSecondary}>
                  Estimated Shipping
                </Text>
                <Text size="sm" fw={500} c={shippingPaise === 0 ? "sage.8" : undefined}>
                  {shippingPaise === 0 ? "Complimentary" : formatINR(shippingPaise)}
                </Text>
              </Group>
              <Divider color={brandTokens.border} />
              <Group justify="space-between">
                <Text size="sm" fw={600}>
                  Estimated Total
                </Text>
                <Text size="md" fw={700}>
                  {formatINR(subtotalPaise + shippingPaise)}
                </Text>
              </Group>
            </Stack>

            <Stack gap="xs">
              <Button
                component={Link}
                href="/checkout"
                color="espresso"
                size="md"
                fullWidth
                onClick={() => setOpened(false)}
              >
                Proceed to Checkout
              </Button>
              <Button
                component={Link}
                href="/cart"
                variant="outline"
                color="espresso"
                size="sm"
                fullWidth
                onClick={() => setOpened(false)}
              >
                View Full Bag
              </Button>
            </Stack>
          </Box>
        </>
      )}
    </Drawer>
  );
}
