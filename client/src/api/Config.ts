interface Config {
    BASE_URL : string;
};


const BASE_URLS = {
    local: `http://localhost:3000/api/v1`
};


type Env = keyof typeof BASE_URLS;


const envUrl = (import.meta.env.VITE_ENVIRONMENT as Env) || 'local';

const config : Config = {
    BASE_URL: BASE_URLS[envUrl]
}


export const ENDPOINTS = {
    AUTH: {
        SIGNUP: "user/auth/register",
        VERIFY_OTP: "user/auth/verify-otp",
        LOGIN: "user/auth/login",
        LOGIN_VERIFY_OTP : "user/auth/login-otp-verify",
        GET_MY_PROFILE: "user/auth/me",
        UPDATE_PROFILE: "user/auth/update",
        GET_MY_ORDERS: "user/auth/orders",
        LOGOUT: "logout",
        UPLOAD_PROFILE: "upload"
    },

    PRODUCTS : {
        GET_PRODUCT_BY_ID: "user/product/:id",
        GET_RECOMMENDED_PRODUCT: "user/product/similiar/:id",
        GET_ALL_PRODUCTS: "user/product/get-all",
        GET_LATEST_PRODUCTS: "user/product/fresh-products",
        GET_BEST_SELLING_PRODUCTS: "user/product/best-selling"
    },
}


const createApiEndpoints = <T extends Record<string, Record<string, string>>>(
  baseURL: string,
  endpoints: T
): { [K in keyof T]: { [P in keyof T[K]]: string } } => {
  const apiEndpoints = {} as any;

  for (const group in endpoints) {
    apiEndpoints[group] = {};
    for (const key in endpoints[group]) {
      apiEndpoints[group][key] = `${baseURL}/${endpoints[group][key]}`;
    }
  }

  return apiEndpoints;
};


const apiEndpoints = createApiEndpoints(config.BASE_URL, ENDPOINTS);

export default apiEndpoints;