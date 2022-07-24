import {
  createTasksAction,
  getTasksAction,
  deleteTasksAction,
} from './asyncActions';
import { initialState } from './initialState';

const resetAction = (state) => {
  // Reset Error
  state.error = initialState.error;
  state.formError = initialState.formError;
};

export const extraReducers = (builder) => {
  builder

    // Get Tasks
    .addCase(getTasksAction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getTasksAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
      resetAction(state);
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
      state.tasks = [action.payload, ...state.tasks];
      resetAction(state);
    })
    .addCase(createTasksAction.rejected, (state, action) => {
      state.isLoading = false;
      state.formError.msg = action.payload;
      state.formError.hasError = true;
    })

    // Delete Tasks
    .addCase(deleteTasksAction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteTasksAction.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      state.isLoading = false;
      console.log('action', action);
      resetAction(state);
    })
    .addCase(deleteTasksAction.rejected, (state, action) => {
      state.error.msg = action.payload;
      state.error.hasError = true;
    });
};
