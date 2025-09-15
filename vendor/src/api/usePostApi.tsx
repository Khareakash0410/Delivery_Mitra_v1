import axios, { AxiosError, type AxiosResponse } from "axios";
import React, { useEffect, useState } from "react"


interface ApiResponse {
    data: any;
    message: string;
    vendor?: any;
    orders?: any;
    token?: string;
    user: any;
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

const usePostApi = (url: string, payload: any) : ApiResult => {

 const [data, setData] = useState<ApiResponse | null>(null);
 const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<ApiError | null>(null);
 const [enabled, setEnabled] = useState<boolean>(false);


 useEffect(() => {
    if (enabled) {
    const fetchData = async () => {
        setLoading(true);
        try {
            const response: AxiosResponse<ApiResponse> = await axios.post(url, payload, {
                withCredentials: true,
            });
            setData(response.data);
        } catch (error: unknown) {
            const apiError = (error as AxiosError<ApiError>).response?.data || { message: "Error adding data."};
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

export default usePostApi;