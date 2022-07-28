import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserTaskHelper } from "./helpers";
export const registerUserTask = createAsyncThunk(
  "session/registerUserTask",
  registerUserTaskHelper
);
