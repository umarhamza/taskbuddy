import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import constants from "../../utils/constants";

export const getTasksAction = createAsyncThunk(
  "tasks/getTasksAction",
  async (_, { thunkAPI }) => {
    try {
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
  }
);

const initialState = {
  tasks: [],
  task: { title: "", notes: "", status: constants.statuses, order: 0 },
  isLoading: false,
  error: { msg: "", hasError: false },
};

const tasksSlice = createSlice({
  name: "tasksDetails",
  initialState,
  reducers: {
    setSelectedTask: (state, action) => {
      state.task = state.tasks.filter((task) => task._id === action.payload);
    },
    resetTasksError: (state) => {
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasksAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasksAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasksAction.rejected, (state, action) => {
        state.isLoading = false;
        state.tasks = initialState.tasks;
        state.error = {
          msg: action.payload,
          hasError: true,
        };
      });
  },
});

export const { setSelectedTask, resetTasksError } = tasksSlice.actions;

export default tasksSlice.reducer;
