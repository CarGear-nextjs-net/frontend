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
