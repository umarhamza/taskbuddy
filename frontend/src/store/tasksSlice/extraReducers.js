import { getTasksAction } from "./asyncActions";
import { initialState } from "./initialState";

export const extraReducers = (builder) => {
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
};
