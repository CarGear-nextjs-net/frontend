import API_BASE_URL from "@/utils/config";
import axios from "axios";

export const addToCart = async (productId, quantity, userId) => {
  const response = await axios.post(`${API_BASE_URL}/api/cart/add-to-cart`, {
    productId,
    quantity,
    userId,
  });
  return response.data;
};

export const getCart = async () => {
  const response = await axios.get(`/api/cart`);
  return response.data;
};
