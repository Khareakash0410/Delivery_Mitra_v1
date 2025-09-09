import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";



interface ApiResponse {
    data: any;
    message: string;
}

interface ApiError {
    message: string;
}

interface ApiResult {
    data: ApiResponse | null;
    loading: boolean;
    error: ApiError | null;
    setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}



const usePutApi = (
  url: string, 
  payload: any,
  id: string | number | null): ApiResult => {
    
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (enabled) {
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.put(`${url}/${id}`, payload, {
                withCredentials: true,
            });
            setData(response.data);
        } catch (error) {
            const apiError = (error as AxiosError<ApiError>).response?.data || { message: "Error updating data."};
            setError(apiError);
        } finally {
            setLoading(false);
        }
    }

    fetchData();

    setEnabled(false);
    }

  }, [url, payload, enabled]);

  return { data, loading, error, setEnabled };
}

export default usePutApi;