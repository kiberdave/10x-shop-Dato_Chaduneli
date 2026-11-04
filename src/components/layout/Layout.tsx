import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Spinner } from "@/components/ui/Spinner";
import { Footer } from "./Footer";
import { Header } from "./Header";

/**
 * One layout for every route: Header + current page (<Outlet />) + Footer.
 * The Header is written once, not on every page.
 */
export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="focus-ring sr-only z-50 rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header />

      <main id="main" className="page-container flex-1 py-6 md:py-10">
        {/* Lazy-loaded pages show this spinner while their JS chunk downloads */}
        <Suspense fallback={<Spinner label="Loading page…" />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
