# 10X Shop — Final report

Live demo: https://10x-shop-dato-chaduneli.vercel.app · Repository: https://github.com/kiberdave/10x-shop-Dato_Chaduneli

## Planned vs delivered

### CORE

| Requirement                                                        | Status |
| ------------------------------------------------------------------ | :----: |
| Vite + React + TS strict, Tailwind v4, typecheck / build = 0 errors | ✅ |
| Types for Product, ProductsResponse, Cart, Login, Checkout         | ✅ |
| Layout + Router: `/`, `/login`, `/products/:id`, `/cart`, `/checkout`, `*` | ✅ |
| AuthContext + controlled Login with validation                     | ✅ |
| Guest on `/checkout` → `/login` → back to `/checkout`              | ✅ |
| Catalog with loading / error / empty states                         | ✅ |
| ProductCard + ProductGrid with `map` and stable keys               | ✅ |
| Product details, stock states, invalid id → 404                    | ✅ |
| CartContext: add / quantity / remove, immutable updates, badge     | ✅ |
| Cart page with totals and empty state                              | ✅ |
| Checkout controlled form + confirmation + cart reset               | ✅ |
| Responsive (375 px), hover / focus / disabled                      | ✅ |
| Error Boundary, DEBUG-LOG                                           | ✅ (6 entries) |
| README, PLAN, REPORT, deploy, Git history                           | ✅ (PLAN written on 1 Nov, see below) |

### FULL

| Requirement                                                   | Status |
| ------------------------------------------------------------- | :----: |
| Search (debounce), category, sort, pagination, URL state      | ✅ |
| AbortController, skeletons, Retry                             | ✅ |
| Reviews + related products                                    | ✅ |
| `useReducer` cart, promo code `10X10`, shipping rule          | ✅ |
| Orders + status simulation + reorder, Profile                 | ✅ |
| Formik + Yup login                                            | ✅ |
| ApiClient, ApiError, Cart class, StorageService<T>, type guards | ✅ |
| `@theme`, dark mode, custom utilities                          | ✅ |
| Lazy routes and images                                         | ✅ |
| Lighthouse before / after, compatibility matrix               | ✅ |

**Not done / out of scope:** sign-up and password recovery, real payment, infinite scroll, wishlist, price-range filter.

**Process items I did not meet:** the work started on 1 Nov, not three weeks earlier, so `PLAN.md` is dated 1 Nov and the commits are spread over 4 days instead of 15. There are no GitHub Issues / pull requests and no weekly progress notes for weeks 1–2. I did not fake dates or write notes after the fact — the Git history shows the real timeline.

## Metrics

| Metric                         | Value |
| ------------------------------ | ----- |
| Main JS chunk (gzip)           | 76.5 kB (target ≤ 250 kB) |
| Login chunk with Formik + Yup  | 25.2 kB gzip, loaded only on `/login` |
| CSS (gzip)                     | 7.5 kB |
| Commits / active days          | 50+ commits on 4 days: 1, 4, 5 and 6 Nov (`git log`); I also worked on 3 Nov without committing |
| Hours spent                    | Not tracked precisely, so I don't give a number. Work days: 1, 3, 4, 5 and 6 Nov |

### Lighthouse (deployed site, Chrome guest profile, Mobile preset)

| Metric          | Before | After | What changed |
| --------------- | -----: | ----: | ------------ |
| Performance     | 91     | 91    | The first row of catalog images loads eagerly with `fetchpriority="high"` instead of `loading="lazy"` (LCP). The score did not move in this run; most of the LCP time is the DummyJSON image CDN. |
| Accessibility   | 99     | 100   | Button and link names start with their visible text (WCAG 2.5.3), heading order h1 → h2 → h3 in the catalog. |
| Best Practices  | 100    | 100   | — |
| SEO             | 58     | 100   | "Before" was measured on the previous deployment's own URL, where Vercel sends `X-Robots-Tag: noindex`. On the production URL the code scored 92 because `/robots.txt` returned the app's HTML (DEBUG-LOG #5); fixed with `public/robots.txt`. |

Screenshots: `docs/lighthouse/before.png` (deployment before the fixes), `docs/lighthouse/after.png` (production after steps `perf:` / `fix:` of 6 Nov).

## Three hardest problems

1. **The toolchain on Windows, day 1.** `npm` was blocked by the PowerShell execution policy, the VS Code terminal did not see Node.js after the install, and the Vite template installed TypeScript 7, which typescript-eslint does not support yet. Solved by `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, restarting VS Code and pinning `typescript ~6.0.3` (DEBUG-LOG #1–#3).
2. **Deploy and the SPA rewrite.** Vercel did not list the new repository until I gave its GitHub App access to it (#4). Later Lighthouse showed that the catch-all rewrite also answered `/robots.txt` with `index.html`; a real `public/robots.txt` fixed it, because Vercel serves real files before rewrites (#5).
3. **Measuring performance honestly.** My first Lighthouse run gave Performance 49, but about 9 s of main-thread work came from browser extensions; the second run had DevTools throttling left on "3G" (+2 s on every request). In a clean guest profile the site scores 91. The clean reports also showed real issues — lazy-loaded LCP images, accessible names that did not start with the visible label, a skipped heading level — which I fixed on 6 Nov.

## What I would do differently

- Start on time: write `PLAN.md` before coding and spread the work over the three weeks, so the history shows real day-by-day progress.
- Open an Issue for every task in the plan and merge each feature through its own pull request.
- Measure Lighthouse in a clean profile from the start, and write a DEBUG-LOG entry the moment a bug appears, not later.
- When the UI shows a computed value (like a discounted price), check what the API actually sorts or filters by (DEBUG-LOG #6).

## AI usage

- I used Claude (Anthropic) during the whole project. From the PRD it built a reference implementation and split it into about 50 small steps; I applied them one by one, read each diff, and ran `typecheck`, `lint` and `build` before every commit. Deploying to Vercel and testing the live site I did myself.
- Claude also reviewed my Lighthouse reports and found the issues fixed in the `perf:` / `fix:` commits of 6 Nov. During the final check it ran the Chrome part of the compatibility pass through the Claude in Chrome extension and found the price-sorting bug (DEBUG-LOG #6); Firefox and Edge I checked myself.
- Rejected: backdating commits, writing week-1/week-2 progress notes or opening Issues and PRs afterwards to make the history look like three weeks — the real dates are what they are. I also discarded my first two Lighthouse runs as a baseline (extensions, throttling).
- Checking: every step had to pass TypeScript strict mode and ESLint with zero errors and build cleanly; the user flows were clicked through on the deployed site in Chrome, Firefox and Edge.
