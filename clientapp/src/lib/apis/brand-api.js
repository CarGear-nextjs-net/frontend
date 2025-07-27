import API_BASE_URL from "@/utils/config";
import axios from "axios";

export const fetchBrands = async ({ page = 1, pageSize = 10, name = "" }) => {
  const res = await axios.get(`${API_BASE_URL}/api/BranchManager/list/branches`, {
    params: {
      page,
      pageSize,
      name,
    },
  });
  return res;
};

export const createBrand = async (body) => {
  const res = await axios.post(`${API_BASE_URL}/api/BranchManager/create`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const updateBrand = async (id, body) => {
  const res = await axios.put(`${API_BASE_URL}/api/BranchManager/update/${id}`, body);
  return res;
};

export const deleteBrand = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/api/BranchManager/delete/${id}`);
  return res;
};

export const fetchListOption = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/BranchManager/list-option`);
  return res;
};
