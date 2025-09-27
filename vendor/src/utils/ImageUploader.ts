import axios from "axios";
import apiEndpoints from "../api/Config";

export const uploadImage = async (
  file: File
) => {

  const formData = new FormData();
  formData.append("image", file);

  try {
    const { data } = await axios.post(apiEndpoints.AUTH.UPLOAD_LOGO, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    return data;
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.message || err.message || "Image upload failed";
    return { error: errorMessage };
  }
};