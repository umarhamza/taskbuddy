import axios from "axios";
import { getErrorMessage } from "../../../utils/helpers";

export const registerUserTaskHelper = async (formData, { rejectWithValue }) => {
  try {
    const { name, email, password } = formData;
    const { data } = axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    return data;
  } catch (error) {
    const { message } = getErrorMessage({ error });
    return rejectWithValue(message);
  }
};
