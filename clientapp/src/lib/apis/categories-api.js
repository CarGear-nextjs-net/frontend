import axios from "axios";
import API_BASE_URL from "@/utils/config";

export const getAllCategoryApi = async () => {
    const res = await axios.get(
      `${API_BASE_URL}/api/CategoryManager/categories`
    );
    return res;
  };

  export const getCategoryApi = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/productmanager/data-create-product`)
    return res.data.categories;
  };