import axios from "axios";
import { getErrorMessage } from "../../../utils/helpers";

const API_URL = "/api/tasks";

export const getTasksActionHelper = async (_, { rejectWithValue }) => {
  try {
    // @TODO create useinterceptors provider
    const { data } = await axios.get(API_URL);
    return data;
  } catch (error) {
    const { message } = getErrorMessage({ error });
    return rejectWithValue(message);
  }
};

export const createTasksActionHelper = async (
  formData,
  { rejectWithValue, getState }
) => {
  try {
    // @TODO create useinterceptors provider
    const { data } = await axios.post(API_URL, {
      ...formData,
      order: getState().tasks.tasks.length + 1,
    });
    return data;
  } catch (error) {
    const { message, options } = getErrorMessage({ error });
    return rejectWithValue({ message, options });
  }
};

export const deleteTasksActionHelper = async (id, { rejectWithValue }) => {
  try {
    const {
      data: { _id },
    } = await axios.delete(`${API_URL}/${id}`);
    return _id;
  } catch (error) {
    const { message } = getErrorMessage({ error });
    return rejectWithValue(message);
  }
};

export const updateTasksActionHelper = async (
  { formData, id },
  { rejectWithValue, getState }
) => {
  try {
    const { data } = await axios.patch(`${API_URL}/${id}`, formData);
    return data;
  } catch (error) {
    const { message, options } = getErrorMessage({ error });
    return rejectWithValue({ message, options });
  }
};
