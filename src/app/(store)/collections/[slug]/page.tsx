import { FEATURED_COLLECTIONS } from "@/data/catalog";
import { CatalogGridView } from "@/components/storefront/CatalogGridView";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const matched = FEATURED_COLLECTIONS.find((c) => c.slug === slug);

  return (
    <CatalogGridView
      eyebrow={matched?.eyebrow ?? "Editorial Collection"}
      title={matched?.title ?? "Curated Capsule"}
      description={
        matched?.description ??
        "Limited seasonal capsule crafted in India from organic cotton and handloom weaves."
      }
      initialCategory={slug === "little-festive-heirlooms" ? "ethnic-wear" : "All"}
    />
  );
}
