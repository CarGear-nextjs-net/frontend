import CreateProductController from "@/components/manager/product/CreateProductController";
import axios from "axios";
import API_BASE_URL from "@/utils/config";
import {fetchDemoData} from "@/lib/api";

export default async function CreateProductPage() {
    const res2 = await axios.get(`${API_BASE_URL}/api/productmanager/data-create-product`);
    const categories = res2.data.categories;
    const brands = res2.data.brands;
    const res = await fetchDemoData();
    return(
        <div className="w-full bg-white">
            <CreateProductController categories={categories} brands={brands} sku={res.sku} />
        </div>
    )
}