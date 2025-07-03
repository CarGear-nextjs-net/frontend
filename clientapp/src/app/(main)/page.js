import NavigationMenuComponent from "@/components/molecules/NavigationMenuComponent";
import BannerController from "@/components/templates/User/banner/BannerController";
import Blogs from "@/components/templates/User/blog/Blogs";
import ReadingProgressBar from "@/components/templates/User/news/reading-progress-bar";
import ProductByCategoryController from "@/components/templates/User/product/ProductByCategoryController";
import TopSellingProductsController from "@/components/templates/User/product/TopSellingProductsController";
import { fetchHomeData } from "@/lib/api";
import { redirect } from "next/navigation";

export default async function Home() {
  const menuCategory = [
    { label: "Sản phẩm", href: "/products", children: [
      { label: "Sản phẩm 1", href: "/products/1" },
      { label: "Sản phẩm 2", href: "/products/2" },
      { label: "Sản phẩm 3", href: "/products/3" },
    ] },
    { label: "Tin tức", href: "/blogs", children: [] },
    { label: "Chính sách", href: "/policies", children: [] },
  ];
  try {
    const data = await fetchHomeData();
    const categoryWithProducts = data.categoryWithProducts;
    return (
      <div className="container-fliud bg-white">
        <ReadingProgressBar />
        <div className="container mx-auto flex">
          <NavigationMenuComponent menu={menuCategory} />
          <BannerController blogs={data.blogInBanner} />
        </div>

        <TopSellingProductsController products={data.topSaleProducts} />
        {categoryWithProducts.map(({ id, name, products }) => (
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
