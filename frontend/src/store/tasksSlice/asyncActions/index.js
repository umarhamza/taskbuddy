import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTasksHelper } from "./asyncActions/helpers";

export const getTasks = createAsyncThunk("tasks/getTasks", fetchTasksHelper);
