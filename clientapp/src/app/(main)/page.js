import BannerController from "@/components/banner/BannerController";
import TopSellingProductController from "@/components/product/TopSellingProductsController";
import ProductByCategoryController from "@/components/product/ProductByCategoryController";
import { redirect } from "next/navigation";
import {fetchHomeData} from "@/lib/api";
import Blogs from "@/components/blog/Blogs";
import ReadingProgressBar from "@/components/news/reading-progress-bar";

export default async function Home() {
    try {
        const data = await fetchHomeData();
        const categoryWithProducts = data.categoryWithProducts;
        return (
            <div className="container-fliud bg-white">
                <ReadingProgressBar/>
                <BannerController blogs={data.blogInBanner} />
                <TopSellingProductController products={data.topSaleProducts} />
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
