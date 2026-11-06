# Compatibility

Checked on the deployed version (https://10x-shop-dato-chaduneli.vercel.app) on 6 Nov 2026, Windows desktop.
Mobile 375 px = the site in a 375 × 812 px frame in Chrome (the viewport width of an iPhone SE), not a real phone. Safari was not available on Windows, so that column is Edge only. Screenshots are in `docs/compat/`.

| Page / flow                     | Chrome desktop | Firefox desktop | Safari / Edge | Mobile 375 px |
| ------------------------------- | :------------: | :-------------: | :-----------: | :-----------: |
| Catalog (search, filter, pages) | ✓ | ✓ | ✓ (Edge) | ✓ |
| Product (gallery, add, reviews) | ✓ | ✓ | ✓ (Edge) | ✓ |
| Cart (quantity, promo, remove)  | ✓ | ✓ | ✓ (Edge) | ✓ |
| Login → Checkout → Thank you    | ✓ | ✓ | ✓ (Edge) | ✓ |
| Orders list + details           | ✓ | ✓ | ✓ (Edge) | ✓ |
| Profile + theme                 | ✓ | ✓ | ✓ (Edge) | ✓ |
| 404 + refresh on `/products/5`  | ✓ | ✓ | ✓ (Edge) | ✓ |

Legend: ✓ works · ⚠ problem (describe below with the fix)

What was checked in every row: search `phone`, category, sort and page 2 with Back · photo switch, Add to cart, posting a review · + / −, promo `10X10`, remove, empty cart · `/checkout` as a guest → `/login` → form validation → order → Thank you, cart cleared · orders list, order details, Reorder · profile save, theme switch survives F5 · `/abc` → 404, F5 on `/products/5`. At 375 px every page fits the width (no horizontal scroll) and the menu button opens the navigation.

## Problems found

| Browser | Problem | Fix |
| ------- | ------- | --- |
| All (found in Chrome) | "Price: low to high" was ordered by the list price, not by the discounted price shown on the card | `sortByShownPrice()` re-sorts each page by the shown price — [b89e3e7](https://github.com/kiberdave/10x-shop-Dato_Chaduneli/commit/b89e3e7), DEBUG-LOG #6 |

No browser-specific problems were found.
