// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MantineProvider } from "@mantine/core";
import { ECommerceLayout } from "./components/layouts/EcommerceLayout";

import ProductDetails from "./features/products/Pages/ProductDetails";
import CheckoutPage from "./features/products/Pages/CheckoutPage";
import { AuthenticationImage } from "./components/common/AuthenticationPage";
import ProductsGrid from "./features/products/Pages/ProductsGrid";

export default function App() {
  return (
    <BrowserRouter>
      <MantineProvider>
        <Routes>
          <Route path="/" element={<ECommerceLayout />}>
            <Route
              path="products/category/:productSlug"
              element={<ProductsGrid />}
            />
            <Route path="products/:productId" element={<ProductDetails />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>
          <Route path="/login" element={<AuthenticationImage />} />
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  );
}
