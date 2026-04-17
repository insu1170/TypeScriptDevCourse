import axios, { AxiosRequestConfig } from "axios";
import { getToken, removeToken } from "../store/authStore";

const BASE_URL = "http://localhost:9999";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      // json을 통해서 컨텐츠를 구현하겠다.
      "Content-Type": "application/json",
      // Authorization: getToken() ? getToken() : "",
    },
    withCredentials: true,
    // parameter로 전달된 config!
    ...config,
  });
  axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  });

  // axios return 값 처리!
  axiosInstance.interceptors.response.use(
    // 응답시 그대로 리턴
    (response) => {
      return response;
    },
    (error) => {
      // 로그인 만료 처리
      if (error.response.status === 401) {
        removeToken();
        window.location.href = "/login";
        return;
      }
      // 에러시 취소!
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

// api호출 시 실제로 사용할 client!
export const httpClient = createClient();
