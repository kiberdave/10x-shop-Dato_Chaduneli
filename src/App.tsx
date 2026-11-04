import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "@/context/CartProvider";
import { ToastProvider } from "@/context/ToastProvider";
import { AppRoutes } from "@/routes/AppRoutes";

/** Providers wrap the routes, so every page can read the shared cart and show toasts. */
export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
