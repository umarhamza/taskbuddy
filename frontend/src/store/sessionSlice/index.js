import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";

const initialState = {
  token: null,
};

const sessionSlice = createSlice({
  name: "sessionDetails",
  initialState,
  reducers,
});

export const { setToken, resetToken } = sessionSlice.actions;

export default sessionSlice.reducer;
