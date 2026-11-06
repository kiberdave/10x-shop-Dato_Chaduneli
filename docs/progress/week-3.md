# Progress — week 3 (31 Oct – 6 Nov 2026)

I started the project in week 3, on 1 Nov, so this is the only weekly note: there was no work in weeks 1–2 to report. The commit history (`git log`) shows the same timeline.

## Done this week

| Day | What I did |
| --- | ---------- |
| 1 Nov | Created the Vite + React + TypeScript project, replaced the template linter with ESLint + typescript-eslint (pinned TypeScript 6), wrote `PLAN.md`, set up Tailwind CSS v4 with design tokens, added the SPA rewrite and connected the repository to Vercel. Setup problems → DEBUG-LOG #1–#4. |
| 3 Nov | Worked on the project without committing. |
| 4 Nov | CORE foundation: types, helpers and validation, UI components, routing with layout and 404, Error Boundary, `ApiClient` / `ApiError`, toasts, `StorageService<T>`, the `Cart` model, reducer and context, login with Formik + Yup, `useFetch`, the catalog with pagination, search / category / sort in the URL, the product page. |
| 5 Nov | Theory test. Product tabs and reviews, related products, cart page, promo code `10X10`, protected checkout with order placement, orders and order details, dark theme, profile, README with the live link. Sent the repository link. |
| 6 Nov | Report and compatibility templates; Lighthouse in a clean profile (two earlier runs were distorted by extensions and DevTools throttling); fixes found by it — eager LCP images, accessible names, heading order, `robots.txt`; the price-sorting bug found while checking the live site; DEBUG-LOG #5–#6, COMPATIBILITY, REPORT, cart icon in the header. |

## State at the end of the week

- All CORE features work on the live site: https://10x-shop-dato-chaduneli.vercel.app
- FULL: search / filters / sort / pagination in the URL, reviews, related products, promo code, orders, profile, Formik + Yup, dark theme, lazy routes, Lighthouse before / after, compatibility matrix.
- Not done: GitHub Issues / pull requests, progress notes for weeks 1–2, demo video.

## Problems

- Windows tooling and the Vercel connection on day 1 (DEBUG-LOG #1–#4).
- Measuring Lighthouse honestly took three runs (REPORT → "Three hardest problems").
- Two bugs found only on the deployed site: `/robots.txt` served the app's HTML (#5), price sorting used the list price (#6).

## Next

- Defense on 7–8 Nov: go through the code module by module and be ready to explain every decision.
