import axios, { AxiosError, type AxiosResponse } from "axios";
import { useEffect, useState } from "react"



interface ApiResponse {
  message: string;
  data: any;
  students: any;
  courses: any;
  subjects: any;
  questions: any;
  colleges: any;
  student: any;
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




const useGetApi = (url: string): ApiResult => {


 const [data, setData] = useState<ApiResponse | null>(null);
 const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<ApiError | null>(null);
 const [enabled, setEnabled] = useState<boolean>(false);


 useEffect(() => {
   if (enabled) {
   const fetchData = async () => {
     setLoading(true);
     try {
       const response: AxiosResponse<ApiResponse> = await axios.get(url, {withCredentials: true});
        setData(response.data);
     } catch (error: unknown) {
        const apiError = (error as AxiosError<ApiError>).response?.data || { message: "Error fetching data."};
        setError(apiError);
     } finally {
        setLoading(false);
     }
   }
   fetchData();

   setEnabled(false)
   }


 }, [url, enabled]);

  return {data, loading, error, setEnabled};

}

export default useGetApi