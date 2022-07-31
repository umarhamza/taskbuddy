import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserTaskHelper, loginUserTaskHelper } from "./helpers";

export const registerUserTask = createAsyncThunk(
  "auth/registerUserTask",
  registerUserTaskHelper
);

export const loginUserTask = createAsyncThunk(
  "auth/loginUserTask",
  loginUserTaskHelper
);
