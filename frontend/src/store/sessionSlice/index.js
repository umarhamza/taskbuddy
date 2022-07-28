import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import { initialState } from "./initialState";
import { extraReducers } from "./extraReducers";

const sessionSlice = createSlice({
  name: "sessionDetails",
  initialState,
  reducers,
  extraReducers,
});

export const { setToken, resetToken } = sessionSlice.actions;

export default sessionSlice.reducer;
