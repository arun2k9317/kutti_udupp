import { PhaseStatusPage } from "@/components/shared/PhaseStatusPage";

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const label = slug.charAt(0).toUpperCase() + slug.slice(1);
  return (
    <PhaseStatusPage
      eyebrow="Store Policies"
      title={`${label} Policy`}
      description="All orders ship across India within 24 hours from Bengaluru. Enjoy complimentary shipping above ₹1,499 and hassle-free 14-day size exchanges."
      phaseLabel="Kutti Udupp Care"
    />
  );
}
