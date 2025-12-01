import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";

export const ApiClient = axios.create({
  baseURL: process.env.API_BASE_URL ? process.env.API_BASE_URL : "http://localhost:5001",
});

ApiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("authToken");
  if (token !== null) {
    return {
      ...config,
      headers: new AxiosHeaders({}).setAuthorization(`${token}`),
    };
  }
  return config;
});

ApiClient.interceptors.response.use(
  ({ data }) => data,
  (error: AxiosError) => Promise.reject(error)
);
