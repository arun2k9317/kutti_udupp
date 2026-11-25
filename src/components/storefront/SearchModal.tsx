"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Badge,
  Box,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { IconArrowRight, IconSearch, IconX } from "@tabler/icons-react";
import { SAMPLE_PRODUCTS, SHOP_CATEGORIES } from "@/data/catalog";
import { formatINR } from "@/lib/format";
import { brandTokens } from "@/lib/theme";
import { useStorefrontStore } from "@/store/useStorefrontStore";

const QUICK_TAGS = [
  "Smocked Dress",
  "Linen Shirt",
  "Baby Romper",
  "Kurta Set",
  "Organic",
  "Festive",
];

export function SearchModal() {
  const opened = useStorefrontStore((s) => s.searchModalOpen);
  const setOpened = useStorefrontStore((s) => s.setSearchModalOpen);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return SAMPLE_PRODUCTS.slice(0, 4);
    return SAMPLE_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed) ||
        p.ageGroup.toLowerCase().includes(trimmed) ||
        p.fabric.toLowerCase().includes(trimmed) ||
        p.gender.toLowerCase().includes(trimmed)
    );
  }, [query]);

  const handleClose = () => {
    setOpened(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      size="lg"
      radius="md"
      withCloseButton={false}
      padding="lg"
      overlayProps={{ backgroundOpacity: 0.4, blur: 4 }}
    >
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Text className="ku-eyebrow">Search Kutti Udupp</Text>
          <UnstyledButton
            onClick={handleClose}
            aria-label="Close search"
            style={{ color: brandTokens.textSecondary }}
          >
            <IconX size={18} />
          </UnstyledButton>
        </Group>

        <TextInput
          placeholder="Search by outfit, fabric, age group (e.g. linen, kurta, 2-4Y)..."
          leftSection={<IconSearch size={18} color={brandTokens.textSecondary} />}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          size="md"
          radius="sm"
          autoFocus
          styles={{
            input: {
              backgroundColor: brandTokens.bgPrimary,
              borderColor: brandTokens.border,
            },
          }}
        />

        <Group gap={6} wrap="wrap">
          {QUICK_TAGS.map((tag) => (
            <Badge
              key={tag}
              component="button"
              type="button"
              variant="light"
              color="warm"
              size="md"
              style={{ cursor: "pointer", border: `1px solid ${brandTokens.border}` }}
              onClick={() => setQuery(tag)}
            >
              {tag}
            </Badge>
          ))}
        </Group>

        <Box>
          <Text size="xs" fw={600} c={brandTokens.textSecondary} mb="xs">
            {query.trim() ? `Matching Outfits (${results.length})` : "Popular Boutique Picks"}
          </Text>

          {results.length === 0 ? (
            <Box py="xl" ta="center" bg={brandTokens.bgPrimary} style={{ borderRadius: 8 }}>
              <Text size="sm" c={brandTokens.textSecondary}>
                No outfits matched &ldquo;{query}&rdquo;. Try searching for linen, cotton, or ethnic wear.
              </Text>
            </Box>
          ) : (
            <Stack gap="xs">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={handleClose}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: 10,
                    borderRadius: 8,
                    border: `1px solid ${brandTokens.border}`,
                    backgroundColor: brandTokens.bgSecondary,
                  }}
                >
                  <Box
                    w={54}
                    h={66}
                    bg={brandTokens.bgSubtle}
                    style={{
                      borderRadius: 6,
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                  <Box style={{ flex: 1, minWidth: 0 }}>
                    <Text size="sm" fw={500} truncate>
                      {product.name}
                    </Text>
                    <Text size="xs" c={brandTokens.textSecondary}>
                      {product.category} · {product.ageGroup}
                    </Text>
                  </Box>
                  <Group gap={6} wrap="nowrap">
                    <Text size="sm" fw={600}>
                      {formatINR(product.pricePaise)}
                    </Text>
                    <IconArrowRight size={15} color={brandTokens.textSecondary} />
                  </Group>
                </Link>
              ))}
            </Stack>
          )}
        </Box>

        <Group gap="xs" pt="xs" style={{ borderTop: `1px solid ${brandTokens.border}` }}>
          <Text size="xs" c={brandTokens.textSecondary}>
            Browse categories:
          </Text>
          {SHOP_CATEGORIES.slice(0, 4).map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              onClick={handleClose}
              style={{ fontSize: "0.75rem", fontWeight: 500, color: brandTokens.accentWarm }}
            >
              {cat.name}
            </Link>
          ))}
        </Group>
      </Stack>
    </Modal>
  );
}
