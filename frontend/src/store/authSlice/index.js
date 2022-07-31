import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import { initialState } from "./initialState";
import { extraReducers } from "./extraReducers";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers,
  extraReducers,
});

export const { setToken, resetToken } = authSlice.actions;

export default authSlice.reducer;
