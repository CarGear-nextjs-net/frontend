import API_BASE_URL from "@/utils/config";
import axios from "axios";

export const addToCartApi = async (items, userId) => {
  const response = await axios.post(`${API_BASE_URL}/api/cart/add-to-cart`, {
    items,
    customerId: userId,
    status: 0,
  });
  return response;
};

export const getCart = async (customerId) => {
  const response = await axios.get(`${API_BASE_URL}/api/cart/cart/${customerId}`);
  return response;
};

export const updateCartAPI = async (data) => {
  const response = await axios.put(`${API_BASE_URL}/api/cart/update-cart`, data);
  return response;
};

export const deleteProductFromCart = async (orderId, productId) => {
  const response = await fetch(`${API_BASE_URL}/api/cart/cart/remove-item`, {
    method: "DELETE",
    body: JSON.stringify({ orderId, productId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
