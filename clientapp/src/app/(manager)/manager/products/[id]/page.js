import {apiDetailProductById} from "@/lib/api";
import ProductDetailController from "@/components/manager/product/ProductDetailController";
import axios from "axios";
import API_BASE_URL from "@/utils/config";

export default async function DetailPage({params}) {
    const {id } = params;
    try{
        const res = await apiDetailProductById(id);
        const product = res.product;
        const res2 = await axios.get(`${API_BASE_URL}/api/productmanager/data-create-product`);
        const categories = res2.data.categories;
        const brands = res2.data.brands;
        return (
            <div className="bg-white">
                <ProductDetailController product={product} categories={categories} brands={brands} />
            </div>
        )
    }catch(error){
        return (
            <div className="h-screen bg-white">
                not found
            </div>
        )
    }
}