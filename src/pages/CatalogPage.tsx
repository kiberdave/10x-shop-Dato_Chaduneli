import { useCallback } from "react";
import { productsEndpoints } from "@/api/products.api";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductGridSkeleton } from "@/components/product/ProductGridSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useFetch } from "@/hooks/useFetch";
import type { CatalogParams } from "@/types/api";
import type { Product, ProductsResponse } from "@/types/product";
import { pluralize } from "@/utils/format";

// First version: always the first 12 products, no filters yet
const FIRST_PAGE: CatalogParams = { q: "", category: "", sort: "", page: 1 };

export default function CatalogPage() {
  useDocumentTitle("Catalog");

  const { state, reload } = useFetch<ProductsResponse>(productsEndpoints.list(FIRST_PAGE));
  const addToCart = useAddToCart();
  // Stable callback (useCallback) so React.memo(ProductCard) can skip re-renders
  const handleAdd = useCallback((product: Product) => addToCart(product, 1), [addToCart]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h1 className="text-3xl md:text-4xl">Catalog</h1>
        {state.status === "success" && (
          <p className="text-sm text-ink-500 dark:text-ink-400">{pluralize(state.data.total, "product")}</p>
        )}
      </div>

      {/* Loading -> Error -> Empty -> Success */}
      {(state.status === "idle" || state.status === "loading") && <ProductGridSkeleton />}

      {state.status === "error" && (
        <ErrorMessage title="Couldn't load products" message={state.message} onRetry={reload} />
      )}

      {state.status === "success" &&
        (state.data.products.length === 0 ? (
          <EmptyState title="No products found." />
        ) : (
          <ProductGrid products={state.data.products} onAdd={handleAdd} />
        ))}
    </div>
  );
}
