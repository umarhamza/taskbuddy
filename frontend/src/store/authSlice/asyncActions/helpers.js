import axiosInstance from "../../../services";
import {
  getErrorMessage,
  removeSessionToken,
  setSessionToken,
} from "../../../utils/helpers";

export const registerUserTaskHelper = async (formData, { rejectWithValue }) => {
  try {
    const { fullname, email, password } = formData;
    const { data } = await axiosInstance.post("/api/users/register", {
      fullname,
      email,
      password,
    });
    setSessionToken(data.token);
    return data;
  } catch (error) {
    removeSessionToken();
    const { message, options } = getErrorMessage({ error });
    return rejectWithValue({ message, options });
  }
};

export const loginUserTaskHelper = async (formData, { rejectWithValue }) => {
  try {
    const { email, password } = formData;
    const { data } = await axiosInstance.post("/api/users/login", {
      email,
      password,
    });
    setSessionToken(data.token);
    return data;
  } catch (error) {
    removeSessionToken();
    const { message, options } = getErrorMessage({ error });
    return rejectWithValue({ message, options });
  }
};
