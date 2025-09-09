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


const useDeleteApi = (
      url: string, 
      id: string | number | null
      ): ApiResult => {
   
      const [data, setData] = useState<ApiResponse | null>(null);
      const [loading, setLoading] = useState<boolean>(false);
      const [error, setError] = useState<ApiError | null>(null);
      const [enabled, setEnabled] = useState<boolean>(false);


      useEffect(() => {
        if (enabled) {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.delete(`${url}/${id}`, {
                    withCredentials: true
                });
                setData(response.data);
            } catch (error) {
                const apiError = (error as AxiosError<ApiError>).response?.data || { message: "Error deleting data."};
                setError(apiError);
            } finally {
                setLoading(false);
            }
        }

        fetchData();

        setEnabled(false);
        }


      }, [url, id, enabled]);

      return { data, loading, error, setEnabled };
}

export default useDeleteApi;