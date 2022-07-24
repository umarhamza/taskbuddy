import axios from "axios";

const API_URL = "/api/tasks";

const getErrorMessage = ({ error }) => {
  const msg = error?.response?.data?.msg;
  const options = error?.response?.data?.options;
  const message = msg || error.toString();
  return { message, options };
};

export const getTasksActionHelper = async (_, { rejectWithValue }) => {
  try {
    // create useinterceptors provider
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
    // create useinterceptors provider
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
    return { ...data, ...formData };
  } catch (error) {
    const { message, options } = getErrorMessage({ error });
    return rejectWithValue({ message, options });
  }
};
