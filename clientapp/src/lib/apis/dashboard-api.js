import API_BASE_URL from "@/utils/config";
import axios from "axios";

export const getDashboardOverviewData = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/dashboard/overview`);
  return response;
};

export const getDashboardOrderRecentData = async (params) => {
  const response = await axios.get(`${API_BASE_URL}/api/dashboard/order-recent`, {
    params,
  });
  return response;
};

export const getDashboardTopProductData = async (params) => {
  const response = await axios.get(`${API_BASE_URL}/api/dashboard/top-products`, {
    params,
  });
  return response;
};
