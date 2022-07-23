import axiosInstance from ".";
const API_URL = "/api/tasks";

export const fetchTasks = () => axiosInstance.get(API_URL);
export const postTask = ({ formData }) => axiosInstance.post(API_URL, formData);
