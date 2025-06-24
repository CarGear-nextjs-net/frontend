import BannerController from "@/components/templates/User/banner/BannerController";
import Blogs from "@/components/templates/User/blog/Blogs";
import ReadingProgressBar from "@/components/templates/User/news/reading-progress-bar";
import ProductByCategoryController from "@/components/templates/User/product/ProductByCategoryController";
import TopSellingProductsController from "@/components/templates/User/product/TopSellingProductsController";
import { fetchHomeData } from "@/lib/api";
import { redirect } from "next/navigation";

export default async function Home() {
  try {
    const data = await fetchHomeData();
    const categoryWithProducts = data.categoryWithProducts;
    return (
      <div className="container-fliud bg-white">
        <ReadingProgressBar />
        <BannerController blogs={data.blogInBanner} />
        <TopSellingProductsController products={data.topSaleProducts} />
        {categoryWithProducts.map(({id,name,products}) => (
                    <ProductByCategoryController key={id} title={name} products={products} />
                ))}
        <Blogs blogs={data.blogInBanner} />
      </div>
    );
  } catch (error) {
    console.error("Không thể kết nối đến API server:", error);
    redirect("/505");
  }
}
