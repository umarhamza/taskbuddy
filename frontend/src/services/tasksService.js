import axiosInstance from ".";

const API_URL = "/api/tasks";

export const fetchTasks = () => axiosInstance.get(API_URL);
