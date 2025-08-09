import ProductDetailController from "@/components/templates/manager/product/ProductDetailController";
import { apiDetailProductById } from "@/lib/api";

export default async function DetailPage({ params }) {
  const { id } = await params;
  try {
    const res = await apiDetailProductById(id);
    const product = res.product;
    return (
      <div className="bg-white">
        <ProductDetailController product={product} />
      </div>
    );
  } catch (error) {
    return <div className="h-screen bg-white">not found</div>;
  }
}
