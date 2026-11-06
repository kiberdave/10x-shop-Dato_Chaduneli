import type { SortOption } from "@/types/api";
import type { Product } from "@/types/product";
import { discountedPrice } from "@/utils/format";

/**
 * DummyJSON sorts `sortBy=price` by the list price, but the card shows the price after discount.
 * Re-sort one page by the price the customer actually pays. Other sort options stay as the API returned them.
 * Limitation: the API still splits pages by list price, so two items near a page border can swap pages.
 */
export function sortByShownPrice(products: Product[], sort: SortOption): Product[] {
  if (sort !== "price-asc" && sort !== "price-desc") return products;
  const direction = sort === "price-asc" ? 1 : -1;
  const shown = (p: Product): number => discountedPrice(p.price, p.discountPercentage);
  // copy first: Array.prototype.sort mutates, and the fetched data must stay unchanged
  return [...products].sort((a, b) => direction * (shown(a) - shown(b)));
}
