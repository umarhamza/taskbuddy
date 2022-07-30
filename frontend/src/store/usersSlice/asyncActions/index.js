import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserTaskHelper, loginUserTaskHelper } from "./helpers";

export const registerUserTask = createAsyncThunk(
  "users/registerUserTask",
  registerUserTaskHelper
);

export const loginUserTask = createAsyncThunk(
  "users/loginUserTask",
  loginUserTaskHelper
);
