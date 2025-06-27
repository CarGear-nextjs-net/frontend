import API_BASE_URL from "@/utils/config";
import axios from "axios";

export const fetchOrdersManager = async (params) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/ordermanager/orders`, {
      params: params,
    });

    return {
      data: res.data.orders,
      totalItem: res.data.totalItem,
      totalPages: res.data.totalPages,
      page: res.data.page,
      pageSize: res.data.pageSize,
    };
  } catch (e) {
    return {
      data: [],
      totalItem: 0,
      totalPages: 0,
      page: 0,
      pageSize: 10,
    };
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const res = await axios.put(`${API_BASE_URL}/api/ordermanager/orders/${orderId}/status`, {
      status: status,
    });
    return res;
  } catch (e) {
    throw e;
  }
};

export const deleteOrderApi = async (orderId) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/api/ordermanager/orders/${orderId}`);
    return res;
  } catch (e) {
    throw e;
  }
};

export const fetchOrdersByCustomerStatus = async (customerId, status) => {
  const res = await axios.get(`${API_BASE_URL}/api/ordermanager/orders/by-customer-status?customerId=${customerId}&status=${status}`);
  return res;
};

export const fetchOrderDetail = async (orderId) => {
  const res = await axios.get(`${API_BASE_URL}/api/ordermanager/orders/${orderId}`);
  return res;
};

export const updateOrderStatusUser = async (orderId, status) => {
  const res = await axios.put(`${API_BASE_URL}/api/ordermanager/update-order-status`, {
    orderId,
    status,
  });
  return res;
};
