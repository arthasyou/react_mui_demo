import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";

// 创建 Axios 实例
const http: AxiosInstance = axios.create({
  baseURL: "/api",
  // baseURL: 'http://192.168.1.25:3837',
  // baseURL: 'https://your-base-url.com/api', // 替换为你的 base URL
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // 允许携带 Cookie
});

// 请求拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在请求发送之前动态设置 header，例如添加 Token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error("HTTP Error:", error);
    return Promise.reject(error.response?.data || error.message);
  }
);

export default http;