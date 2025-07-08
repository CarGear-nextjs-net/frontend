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

  export const createCategoryApi = async (body) => {
    const res = await axios.post(`${API_BASE_URL}/api/CategoryManager/create`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  };

  export const updateCategoryApi = async (id, body) => {
    const res = await axios.put(`${API_BASE_URL}/api/CategoryManager/update/${id}`, body);
    return res.data;
  };

  export const deleteCategoryApi = async (id) => {
    const res = await axios.delete(`${API_BASE_URL}/api/CategoryManager/delete/${id}`);

    return res;
  };
