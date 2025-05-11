import ProductDetail from "@/app/product/ProductDetail";
import ProductRelate from "@/app/product/ProductRelates";
import NotFound from "@/app/not-found";
import {fetchProductBySlug} from "@/lib/api";
export default async function ProductPage({ params }) {
   try{
       const { slug } = params;

       const data = await fetchProductBySlug(slug);

       // Nếu không có product thì trả về trang 404
       if (!data?.product) {
           return <NotFound/>
       }

       return (
           <div className={"bg-white"}>
               <ProductDetail product={data.product} />
               <ProductRelate products={data.productRelates} />
           </div>
       );
   }catch(err){
       return <NotFound/>
   }
}
