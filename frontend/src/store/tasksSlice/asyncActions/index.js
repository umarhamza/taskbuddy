import { createAsyncThunk } from "@reduxjs/toolkit";
import { createTasksActionHelper, getTasksActionHelper } from "./helpers";

export const getTasksAction = createAsyncThunk(
  "tasks/getTasksAction",
  getTasksActionHelper
);

export const createTasksAction = createAsyncThunk(
  "tasks/createTasksAction",
  createTasksActionHelper
);
