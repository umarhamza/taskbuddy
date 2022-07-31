import axios from "axios";

let store;

// You cannot import store into non-component files. So we can update store using the injectStore function
export const injectStore = (_store) => {
  store = _store;
};

const axiosInstance = axios.create();

// @TODO Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const token = store.getState().auth.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
