import { axiosInstance } from ".";

export const fetchTasks = async () => axiosInstance.get("/api/tasks");
