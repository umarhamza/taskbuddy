import axiosInstance from ".";
const API_URL = "/api/tasks";

/**
 * @TODO
 * Add all routes here
 */
export const fetchTasks = () => axiosInstance.get(API_URL);
export const postTask = ({ formData }) => axiosInstance.post(API_URL, formData);
export const deleteTask = ({ id }) => axiosInstance.delete(`${API_URL}/${id}`);
