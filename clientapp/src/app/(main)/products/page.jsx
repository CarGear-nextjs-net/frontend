import ProductListingPage from "@/components/templates/User/products/product-listing-page";
import { fetchCategories, getBrands, getCategories, getProducts } from "@/lib/api";

export default async function ProductsPage({ searchParams }) {
  // Lấy các tham số từ URL
  const categoryId = searchParams.category ? Number(searchParams.category) : undefined;
  const brandIds = searchParams.brands
    ? Array.isArray(searchParams.brands)
      ? searchParams.brands.map(Number)
      : [Number(searchParams.brands)]
    : undefined;
  const sort = (searchParams.sort = "");
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : undefined;
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined;
  const search = searchParams.search;

  // Lấy dữ liệu
  const categories = await fetchCategories();
  // const brands = await getBrands();
  // const { products, totalProducts } = await getProducts({
  //   categoryId,
  //   brandIds,
  //   sort,
  //   page,
  //   minPrice,
  //   maxPrice,
  //   search,
  // });

  return (
    <ProductListingPage
        categories={categories}
        brands={[]}
        products={[]}
        totalProducts={0}
        initialFilters={{
            categoryId,
            brandIds,
            sort,
            page,
            minPrice,
            maxPrice,
            search,
        }}
    />
  );
}
