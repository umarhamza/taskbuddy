import { fetchTasks } from "../../../apis/tasksAPI";

export const fetchTasksHelper = async (_, { getStore }) => {
  const { data } = await fetchTasks();
  return data;
};
