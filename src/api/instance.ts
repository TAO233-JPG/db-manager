import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 12 * 1000,
});

// 请求拦截器
instance.interceptors.request.use(
  (requestConfig) => {
    console.log("axios 请求拦截器", requestConfig);
    return requestConfig;
  },
  (error) => {
    console.log("axios 请求失败拦截器", error);

    return new Promise(error);
  }
);

// 相应拦截器
instance.interceptors.response.use(
  (response) => {
    console.log(`axios 响应拦截器`, response);
    return response;
  },
  (error) => {
    console.log(`axios 失败响应拦截器`, error);
  }
);

export default instance;
