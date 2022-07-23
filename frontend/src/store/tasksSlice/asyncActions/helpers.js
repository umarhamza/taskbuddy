import axios from "axios";

export const getTasksActionHelper = async (_, { thunkAPI }) => {
  try {
    // create useinterceptors provider
    const { data } = await axios.get("/api/tasks");
    return data;
  } catch (error) {
    const { response } = error;
    const { data } = response;

    const message =
      (response && data && data.message) ||
      error.message ||
      error.msg ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
};
