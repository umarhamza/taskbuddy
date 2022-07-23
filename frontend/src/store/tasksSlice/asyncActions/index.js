import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTasksActionHelper } from "./helpers";

export const getTasksAction = createAsyncThunk(
  "tasks/getTasksAction",
  getTasksActionHelper
);
