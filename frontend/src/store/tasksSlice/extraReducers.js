import {
  createTasksAction,
  getTasksAction,
  deleteTasksAction,
  updateTasksAction,
} from "./asyncActions";
import { initialState } from "./initialState";

const resetAction = (state) => {
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
      const { message, options } = action.payload;
      state.isLoading = false;
      state.formError.msg = message;
      state.formError.hasError = true;
      state.formError.emptyFields = options.emptyFields;
    })

    // Delete Tasks
    .addCase(deleteTasksAction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteTasksAction.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      state.isLoading = false;
      resetAction(state);
    })
    .addCase(deleteTasksAction.rejected, (state, action) => {
      state.error.msg = action.payload;
      state.error.hasError = true;
    })

    // Update Tasks
    .addCase(updateTasksAction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateTasksAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = state.tasks.reduce((acc, curr) => {
        if (curr._id === action.payload._id) {
          acc.push(action.payload);
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);
      resetAction(state);
    })
    .addCase(updateTasksAction.rejected, (state, action) => {
      state.error.msg = action.payload;
      state.error.hasError = true;
    });
};
