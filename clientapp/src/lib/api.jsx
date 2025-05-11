import axios from "axios";
import API_BASE_URL from "@/utils/config";
import qs from "qs"
const fetchHeaderData =  async ()=>{
    try {
        const response = await axios.get(`${API_BASE_URL}/api/groupCategories`);
        return {
            groups: response.data,
        };
    } catch (e) {
        return null;
    }
}
const fetchFooterData =()=>{

}
const fetchHomeData = async () => {
    try{
        const response = await axios.get(API_BASE_URL+"/api/home/data-home-page",{
            params: {
                topSale :6
            }
        });
        return {
            topSaleProducts: response.data.topSaleProducts,
            blogs: response.data.blogs,
            groupProductMap: response.data.groupProductMap,
            blogInBanner: response.data.blogInBanner
        };
    }catch (e){
        throw e;
    }
}
const fetchProductBySlug = async (slug) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/productdetailpage/${slug}`)
        return {
            product: response.data.product,
            productRelates : response.data.productRelates,
        }
    } catch (error) {
        console.log(error)
    }
}
const fetchFilterProduct = async ({page,pageSize,categories,brands,minPrice,maxPrice,sortOrder}) => {
    const params = {
        page,
        pageSize,
        categories: categories,
        brands: brands,
        minPrice,
        maxPrice,
        sortOrder: sortOrder,
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/api/productdetailpage/filter`, {
            params,
            paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
        })
        return {
            products: response.data.products,
            totalPages: response.data.totalPages,
        }
    } catch (e) {
        console.error(e)
    }
}

const fetchDataForFilter = async ()=>{
    try{
        const response = await axios.get(`${API_BASE_URL}/api/productdetailpage/get-data-for-filter`, {})
        return {
            groups: response.data.groups,
            brands: response.data.brands,
            sortOrder: response.data.sortOrder,
        };
    }catch (e){

    }
}

export { fetchHeaderData, fetchFooterData,fetchHomeData,fetchProductBySlug ,fetchFilterProduct,fetchDataForFilter };