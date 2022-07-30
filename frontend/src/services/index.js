import { store } from "../store";
import axios from "axios";

const axiosInstance = axios.create();

// @TODO Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const token = store.getState().users.token;
    config.headers.Authorization = token;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
