interface Config {
    BASE_URL: string;
};


const BASE_URLS = {
    // Add other env as needed
    local: `http://localhost:3000/api/v1`
} as const;


type Env = keyof typeof BASE_URLS;

const envURL = (import.meta.env.VITE_ENVIRONMENT as Env) || 'local';


const config : Config = {
    BASE_URL: BASE_URLS[envURL]
}

export const ENDPOINTS = {
    AUTH: {
        LOGIN: 'vendor/auth/login',
        LOGOUT: 'logout',
        GET_ME: 'vendor/auth',
        UPDATE_PROFILE: "vendor/auth",
        UPDATE_PASSWORD: "vendor/auth/password",
        STORE_STATUS: "vendor/auth/store-status",
        UPLOAD_LOGO: "upload"
    },
    PRODUCT: {
        GET_ALL: 'vendor/product',
        ADD: "vendor/product",
        GET_SINGLE:  "vendor/product/:id",
        UPDATE:  "vendor/product/:id",
        DELETE:  "vendor/product/:id",
        ALL_CATEGORY: "vendor/product/all-category"
    },
    ORDER: {
        GET_ALL: 'vendor/order',
        GET_SINGLE: "vendor/order/:id",
        UPDATE:  `vendor/order/:id`,
        DISPATCH: "vendor/order/dispatchOrder"
    },
    PAYMENT: {
        GET_DAILY: 'vendor/payment',
        GET_PAYMENT_DAY: 'vendor/payment/allPaymentsInDay'
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