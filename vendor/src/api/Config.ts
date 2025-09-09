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
        LOGIN: 'student/admin-login',
        OTP_VERIFY_LOGIN: 'auth/verify-login-otp',
        LOGOUT: 'auth/logout',
        GET_ME: 'auth/getMe',
    },
    STUDENT: {
        GET_ALL: 'student/all',
        DELETE:  `student/delete`,
        UPDATE:  `student/update`,
    },
    COURSE: {
        ADD: 'course/add-course',
        GET_ALL: 'course/getAll-course',
        DELETE:  `course/delete-course`,
        UPDATE:  `course/edit-course`,
    },
    SUBJECT: {
        ADD: 'subject/add-subject',
        GET_ALL: 'subject/getAll-subject',
        DELETE:  `subject/delete-subject`,
    },
    QUESTION: {
        ADD: 'question/add-quiz',
        GET_ALL: 'question/get-all',
        DELETE:  `question/delete`,
    },
    COLLEGE: {
        ADD: 'college/add-college',
        GET_ALL: 'college/get-all-college',
        DELETE:  `college/delete-college`,
        UPDATE:  `college/edit-college`,
    }
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