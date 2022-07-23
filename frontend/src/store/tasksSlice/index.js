import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import reducers from "./reducers";

// Register thunk

const tasksSlice = createSlice({
  name: "tasksDetails",
  initialState,
  reducers,
  extraReducers: (builder) => {},
});

export const { setSelectedTask, resetTasksError } = tasksSlice.actions;

export default tasksSlice.reducer;
