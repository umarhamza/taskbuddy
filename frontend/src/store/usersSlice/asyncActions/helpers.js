import axios from "axios";
import { getErrorMessage } from "../../../utils/helpers";

export const registerUserTaskHelper = async (formData, { rejectWithValue }) => {
  try {
    const { fullname, email, password } = formData;
    const { data } = await axios.post("/api/users/register", {
      fullname,
      email,
      password,
    });
    console.log("data", data);
    return data;
  } catch (error) {
    const { message } = getErrorMessage({ error });
    return rejectWithValue(message);
  }
};

export const loginUserTaskHelper = async (formData, { rejectWithValue }) => {
  try {
    const { email, password } = formData;
    const { data } = await axios.post("/api/users/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    const { message } = getErrorMessage({ error });
    return rejectWithValue(message);
  }
};
