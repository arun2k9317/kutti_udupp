import { notFound } from "next/navigation";
import { SAMPLE_PRODUCTS } from "@/data/catalog";
import { ProductDetailView } from "@/components/storefront/ProductDetailView";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = SAMPLE_PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }
  return <ProductDetailView product={product} />;
}
