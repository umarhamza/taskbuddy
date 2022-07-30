import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import { initialState } from "./initialState";
import { extraReducers } from "./extraReducers";

const usersSlice = createSlice({
  name: "sessionDetails",
  initialState,
  reducers,
  extraReducers,
});

export const { setToken, resetToken } = usersSlice.actions;

export default usersSlice.reducer;
