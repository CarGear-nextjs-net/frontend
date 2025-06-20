import ProductController from "@/components/templates/manager/product/ProductController";
import { fetchProductManager } from "@/lib/api";
import API_BASE_URL from "@/utils/config";
import axios from "axios";

export default async function Products() {
  try {
    const res1 = await fetchProductManager(1, 10, 0);
    const res2 = await axios.get(`${API_BASE_URL}/api/productmanager/data-create-product`);
    const products = res1.products;
    const categories = res2.data.categories;
    const brands = res2.data.brands;
    const totalPages = res1.totalPages;
    return (
      <div className="w-full bg-white min-h-screen ">
        <ProductController
          products={products}
          categories={categories}
          brands={brands}
          totalPages={totalPages}
        />
      </div>
    );
  } catch (e) {}
}
