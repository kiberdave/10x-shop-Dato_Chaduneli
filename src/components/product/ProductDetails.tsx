import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { PriceTag } from "@/components/ui/PriceTag";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { StockBadge } from "@/components/ui/StockBadge";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useCart } from "@/hooks/useCart";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import type { Product } from "@/types/product";
import { SHIPPING } from "@/utils/constants";
import { formatCategory, formatPrice, formatRating, pluralize } from "@/utils/format";
import { ProductGallery } from "./ProductGallery";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  useDocumentTitle(product.title);

  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCart();
  const addToCart = useAddToCart();

  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = product.stock <= 0;
  const inCart = items.find((item) => item.productId === product.id)?.quantity ?? 0;
  const images = product.images.length > 0 ? product.images : [product.thumbnail];

  function handleBack() {
    // Came from inside the app -> real "back" (the catalog filters are kept in the URL).
    // Opened the link directly -> there is no app history, go to the catalog.
    if (location.key !== "default") navigate(-1);
    else navigate("/");
  }

  function handleAddToCart() {
    const added = addToCart(product, quantity);
    if (added) setQuantity(1);
  }

  return (
    <div>
      <Button variant="ghost" size="sm" onClick={handleBack} className="-ml-3 mb-4">
        ← Back to catalog
      </Button>

      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <ProductGallery images={images} title={product.title} />

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-ink-500 dark:text-ink-400">
              {product.brand && <span>{product.brand} · </span>}
              <Link
                to={`/?category=${encodeURIComponent(product.category)}`}
                className="focus-ring rounded font-medium text-brand-700 capitalize hover:underline dark:text-brand-300"
              >
                {formatCategory(product.category)}
              </Link>
            </p>
            <h1 className="text-3xl leading-tight md:text-4xl">{product.title}</h1>
            <p className="text-sm">
              <span aria-hidden="true" className="text-low">
                ★
              </span>{" "}
              <span className="font-semibold">{formatRating(product.rating)}</span>
              <span className="text-ink-500 dark:text-ink-400"> · {pluralize(product.reviews.length, "review")}</span>
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <PriceTag price={product.price} discountPercentage={product.discountPercentage} size="lg" />
            <StockBadge stock={product.stock} />
          </div>

          <p className="max-w-prose leading-relaxed text-ink-700 dark:text-ink-200">{product.description}</p>

          <div className="flex flex-wrap items-center gap-3">
            <QuantityStepper
              value={quantity}
              max={Math.max(1, product.stock)}
              onChange={setQuantity}
              disabled={isOutOfStock}
            />
            <Button size="lg" onClick={handleAddToCart} disabled={isOutOfStock} className="flex-1 sm:flex-none">
              {isOutOfStock ? "Out of stock" : "Add to cart"}
            </Button>
          </div>

          {inCart > 0 && (
            <p className="text-sm text-ink-600 dark:text-ink-300">
              {inCart} in your cart.{" "}
              <Link to="/cart" className="focus-ring rounded font-semibold text-brand-700 hover:underline dark:text-brand-300">
                View cart
              </Link>
            </p>
          )}

          <p className="text-sm text-ink-500 dark:text-ink-400">
            Free shipping on orders from {formatPrice(SHIPPING.freeFrom)}.
          </p>
        </div>
      </div>
    </div>
  );
}
