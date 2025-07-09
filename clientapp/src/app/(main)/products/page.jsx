import ProductListingPage from "@/components/templates/User/products/product-listing-page";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductListingPage />
    </Suspense>
  );
}
