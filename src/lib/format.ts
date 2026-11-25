/**
 * Format an integer amount in paise to Indian Rupee currency string.
 * Example: 129900 -> "₹1,299"
 */
export function formatINR(paise: number, showDecimals = false): string {
  const rupees = paise / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(rupees);
}

export function getDiscountPercent(
  pricePaise: number,
  compareAtPricePaise?: number
): number | null {
  if (!compareAtPricePaise || compareAtPricePaise <= pricePaise) {
    return null;
  }
  return Math.round(((compareAtPricePaise - pricePaise) / compareAtPricePaise) * 100);
}
