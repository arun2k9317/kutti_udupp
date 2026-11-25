import { SHOP_CATEGORIES } from "@/data/catalog";
import { CatalogGridView } from "@/components/storefront/CatalogGridView";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const matched = SHOP_CATEGORIES.find((c) => c.slug === slug);

  return (
    <CatalogGridView
      eyebrow="Shop by Category"
      title={matched?.name ?? "Boutique Collection"}
      description={
        matched?.subtitle ??
        "Thoughtfully designed children's clothing crafted with gentle, breathable fabrics."
      }
      initialCategory={matched ? matched.slug : "All"}
    />
  );
}
