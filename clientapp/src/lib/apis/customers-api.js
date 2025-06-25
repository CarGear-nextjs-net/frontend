import API_BASE_URL from "@/utils/config";
import axios from "axios";

export const fetchUsersManager = async (params) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/customermanager/customers`, {
        params: params,
      });
  
      return res;
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