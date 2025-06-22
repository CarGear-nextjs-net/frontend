import API_BASE_URL from "@/utils/config";
import axios from "axios";

export const createContentApi = async ({ data }) => {
    const res = await axios.post(
      `${API_BASE_URL}/api/ArticleManager/articles`,
      data
    );
    return res;
  };

export const deleteContentApi = async ({ id }) => {
  const res = await axios.delete(
    `${API_BASE_URL}/api/ArticleManager/articles/${id}`
  );
  return res;
};

export const getDetailContentApi = async (id) => {
  console.log("🚀 ~ getDetailContentApi ~ id:", id)
  const res = await axios.get(
    `${API_BASE_URL}/api/ArticleManager/articles/${id}`
  );
  return res;
};
