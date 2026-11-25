"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Group,
  SegmentedControl,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { ProductItem, SAMPLE_PRODUCTS } from "@/data/catalog";
import { brandTokens } from "@/lib/theme";
import { ProductCard } from "@/components/storefront/ProductCard";
import { QuickViewModal } from "@/components/storefront/QuickViewModal";

interface CatalogGridViewProps {
  title: string;
  eyebrow: string;
  description: string;
  initialCategory?: string;
}

export function CatalogGridView({
  title,
  eyebrow,
  description,
  initialCategory = "All",
}: CatalogGridViewProps) {
  const [filter, setFilter] = useState(initialCategory);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);

  const filtered = SAMPLE_PRODUCTS.filter((p) => {
    if (filter === "All" || filter === "new-arrivals") return filter === "All" ? true : p.isNewArrival;
    return (
      p.categorySlug === filter ||
      p.gender.toLowerCase() === filter.toLowerCase()
    );
  });

  return (
    <Box py={{ base: 36, md: 56 }} bg={brandTokens.bgPrimary}>
      <Container>
        <Breadcrumbs mb="md" separator="/">
          <Link href="/" style={{ fontSize: "0.8rem", color: brandTokens.textSecondary }}>
            Home
          </Link>
          <Text size="xs" fw={600}>
            {title}
          </Text>
        </Breadcrumbs>

        <Group justify="space-between" align="flex-end" mb={32} wrap="wrap" gap="md">
          <Stack gap={6} maw={620}>
            <Text className="ku-eyebrow">{eyebrow}</Text>
            <Title order={1} className="ku-serif" fz={{ base: 28, md: 38 }}>
              {title}
            </Title>
            <Text size="sm" c={brandTokens.textSecondary} lh={1.6}>
              {description}
            </Text>
          </Stack>

          <SegmentedControl
            value={filter}
            onChange={setFilter}
            data={[
              { label: "All", value: "All" },
              { label: "Boys", value: "boys" },
              { label: "Girls", value: "girls" },
              { label: "Baby", value: "baby-clothing" },
              { label: "Dresses", value: "dresses" },
              { label: "Ethnic", value: "ethnic-wear" },
            ]}
            size="xs"
            color="espresso"
            styles={{
              root: {
                backgroundColor: brandTokens.bgSecondary,
                border: `1px solid ${brandTokens.border}`,
              },
            }}
          />
        </Group>

        <Grid gutter={{ base: 14, md: 20 }}>
          {filtered.map((product) => (
            <Grid.Col key={product.id} span={{ base: 12, xs: 6, md: 3 }}>
              <ProductCard
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </Box>
  );
}
