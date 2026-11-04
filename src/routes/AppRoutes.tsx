import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import CatalogPage from "@/pages/CatalogPage";

// Route-level code splitting: each page below is a separate JS chunk,
// downloaded only when the user opens that route (see the Network tab).
// The catalog is the landing page, so it stays in the main bundle.
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export function AppRoutes() {
  return (
    <Routes>
      {/* Layout route: Header + <Outlet /> + Footer around every page */}
      <Route element={<Layout />}>
        <Route index element={<CatalogPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
