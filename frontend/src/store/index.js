import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import sessionReducer from "./usersSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: sessionReducer,
  },
});
