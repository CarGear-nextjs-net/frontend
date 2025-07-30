import { uploadImageArticle } from "@/lib/apis/contents-api";

export const uploadFileS3 = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await uploadImageArticle(formData);

    if (response.status !== 200) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.data.url;
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error(error.response?.data?.message || "Upload failed");
  }
};
