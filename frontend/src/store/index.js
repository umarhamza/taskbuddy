import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import sessionReducer from "./sessionSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    session: sessionReducer,
  },
});
