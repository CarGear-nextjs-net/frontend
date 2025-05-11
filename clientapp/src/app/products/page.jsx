import ProductListing from "@/app/products/product-list";
import {fetchDataForFilter, fetchFilterProduct} from "@/lib/api";

export default async function ProductPage() {
    const page =1
    const pageSize = 10
    const categories=[]
    const brands=[]
    const minPrice=0
    const maxPrice=0
    const sortOrder=[]
    const data = await fetchFilterProduct(page,pageSize,categories,brands,minPrice,maxPrice,sortOrder)
    const filters = await fetchDataForFilter() || null;
    return (
       <div className="fullscreen px-4">
           <ProductListing products={data.products} filters={filters} />
       </div>
    )
};