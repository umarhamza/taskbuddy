import { createTasksAction, getTasksAction } from "./asyncActions";

export const extraReducers = (builder) => {
  builder

    // Get Tasks
    .addCase(getTasksAction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getTasksAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
    })
    .addCase(getTasksAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error.msg = action.payload;
      state.error.hasError = true;
    })

    // Create Task
    .addCase(createTasksAction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createTasksAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = [...state.tasks, action.payload].sort(
        (a, b) => b.order - a.order
      );
    })
    .addCase(createTasksAction.rejected, (state, action) => {
      state.isLoading = false;
      state.formError.msg = action.payload;
      state.formError.hasError = true;
    });
};
