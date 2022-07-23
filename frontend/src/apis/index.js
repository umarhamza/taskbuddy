import { store } from "../store";
import axios from "axios";

export const axiosInstance = axios.create();

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    const token = store.getState().session.token;
    config.headers.Authorization = token;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
