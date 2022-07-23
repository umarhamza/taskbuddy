import { axiosInstance } from ".";

const API_URL = "/api/tasks";

export const fetchTasks = async () => axiosInstance.get(API_URL);
