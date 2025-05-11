import Banner from "@/components/banner/Banner";
import TopSellingProducts from "@/components/topsaleproducts/TopSellingProducts";
import ProductGroups from "@/components/productbycategory/ProductGroups";
import { redirect } from "next/navigation";
import {fetchHomeData} from "@/lib/api";

export default async function Home() {
    try {
        const data = await fetchHomeData();
        return (
            <div className="fullscreen bg-white">
                <Banner blogs={data.blogs} />
                <TopSellingProducts products={data.topSaleProducts} />
                <ProductGroups groupProductMap={data.groupProductMap} />
            </div>
        );
    } catch (error) {
        console.error("Không thể kết nối đến API server:", error);
        redirect("/505");
    }
}
