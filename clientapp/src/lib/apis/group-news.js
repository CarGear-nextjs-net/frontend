import API_BASE_URL from "@/utils/config";
import axios from "axios";

export const createContentApi = async ({ data }) => {
  const res = await axios.post(`${API_BASE_URL}/api/group-news/create`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const getDataGroupNews = async ({ data }) => {
  const res = await axios.post(`${API_BASE_URL}/api/group-news/list`, {
    params: data,
  });
  return res;
};
