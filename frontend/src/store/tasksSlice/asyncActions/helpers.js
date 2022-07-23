import axios from "axios";

const getErrorMessage = ({ error }) => {
  const msg = error?.response?.data.msg;
  const message = msg || error.toString();
  return message;
};

export const getTasksActionHelper = async (_, { rejectWithValue }) => {
  try {
    // create useinterceptors provider
    const { data } = await axios.get("/api/tasks");
    return data;
  } catch (error) {
    const message = getErrorMessage({ error });
    return rejectWithValue(message);
  }
};

export const createTasksActionHelper = async (
  formData,
  { rejectWithValue, getState }
) => {
  try {
    // create useinterceptors provider
    const { data } = await axios.post("/api/tasks", {
      ...formData,
      order: getState().tasks.tasks.length + 1,
    });
    return data;
  } catch (error) {
    const message = getErrorMessage({ error });
    return rejectWithValue(message);
  }
};
