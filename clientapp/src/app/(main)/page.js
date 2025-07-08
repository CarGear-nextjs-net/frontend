import NavigationMenuComponent from "@/components/molecules/NavigationMenuComponent";
import BannerController from "@/components/templates/User/banner/BannerController";
import Blogs from "@/components/templates/User/blog/Blogs";
import ReadingProgressBar from "@/components/templates/User/news/reading-progress-bar";
import ProductByCategoryController from "@/components/templates/User/product/ProductByCategoryController";
import TopSellingProductsController from "@/components/templates/User/product/TopSellingProductsController";
import { fetchCategories, fetchHomeData } from "@/lib/api";
import Policies from "@/components/organisms/Policies";
import { AlignJustify } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Home() {
  try {
    const data = await fetchHomeData();
    const menuCategory = await fetchCategories();
    const categoryWithProducts = data.categoryWithProducts;
    const blogs = [
      {
        articleId: 1,
        title: "Tin tức 1",
        description: "Mô tả tin tức 1",
        image: "C:/Users/nguye/Desktop/Project/backend/database-image/banner/banner1.jpg",
        createdAt: "2021-01-01",
        updatedAt: "2021-01-01",
        isActive: true,
        isFeatured: true,
      },
      {
        articleId: 2,
        title: "Tin tức 1",
        description: "Mô tả tin tức 1",
        image: "C:/Users/nguye/Desktop/Project/backend/database-image/banner/banner2.jpg",
        createdAt: "2021-01-01",
        updatedAt: "2021-01-01",
        isActive: true,
        isFeatured: true,
      },
      {
        articleId: 3,
        title: "Tin tức 1",
        description: "Mô tả tin tức 1",
        image: "C:/Users/nguye/Desktop/Project/backend/database-image/banner/banner3.jpg",
        createdAt: "2021-01-01",
        updatedAt: "2021-01-01",
        isActive: true,
        isFeatured: true,
      },
      {
        articleId: 4,
        title: "Tin tức 1",
        description: "Mô tả tin tức 1",
        image: "C:/Users/nguye/Desktop/Project/backend/database-image/banner/banner3.jpg",
        createdAt: "2021-01-01",
        updatedAt: "2021-01-01",
        isActive: true,
        isFeatured: true,
      },
      {
        articleId: 5,
        title: "Tin tức 1",
        description: "Mô tả tin tức 1",
        image: "C:/Users/nguye/Desktop/Project/backend/database-image/banner/banner3.jpg",
        createdAt: "2021-01-01",
        updatedAt: "2021-01-01",
        isActive: true,
        isFeatured: true,
      },
    ];
    return (
      <div className="container-fliud bg-white">
        <ReadingProgressBar />
        <div className="w-[1275px] h-[536px] mx-auto flex justify-center gap-5 my-2 px-4">
          <div className="md:w-[250px]">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlignJustify className="w-5 h-5" />
              <h2 className="text-xl font-bold">Danh mục sản phẩm</h2>
            </div>

            <NavigationMenuComponent menu={menuCategory} className="max-w-full h-[500px] border items-start" />
          </div>
          <BannerController blogs={blogs} />
        </div>

        <Policies />
        <TopSellingProductsController products={data.topSaleProducts} />
        {categoryWithProducts.map(({ id, name, products }) => (
          <ProductByCategoryController key={id} title={name} products={products} />
        ))}
        <Blogs blogs={blogs} />
      </div>
    );
  } catch (error) {
    console.error("Không thể kết nối đến API server:", error);
    redirect("/505");
  }
}
