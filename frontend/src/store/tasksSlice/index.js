import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import constants from "../../utils/constants";
import { getTasksAction } from "./asyncActions";
import { initialState } from "./initialState";
import { extraReducers } from "./extraReducers";
import { reducers } from "./reducers";

const tasksSlice = createSlice({
  name: "tasksDetails",
  initialState,
  reducers,
  extraReducers,
});

export const { setSelectedTask, resetTasksError } = tasksSlice.actions;

export default tasksSlice.reducer;
