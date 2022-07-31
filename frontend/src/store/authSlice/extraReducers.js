import { loginUserTask, registerUserTask } from "./asyncActions";
import { initialState } from "./initialState";

const rejected = (state, action) => {
  const { message, options } = action.payload;
  state.isLoading = false;
  state.user = initialState.user;
  state.token = initialState.token;
  state.success = false;
  state.formError.msg = message;
  state.formError.hasError = true;
  state.formError.emptyFields = options?.emptyFields || [];
  state.isAuthenticated = false;
};

const fulfilled = (state, action) => {
  state.isLoading = false;
  state.user.email = action.payload.email;
  state.token = action.payload.token;
  state.isAuthenticated = true;
  state.success = true;
};

export const extraReducers = (builder) => {
  builder
    // Register
    .addCase(registerUserTask.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(registerUserTask.fulfilled, (state, action) => {
      fulfilled(state, action);
    })
    .addCase(registerUserTask.rejected, (state, action) => {
      rejected(state, action);
    })

    // Login
    .addCase(loginUserTask.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginUserTask.fulfilled, (state, action) => {
      fulfilled(state, action);
    })
    .addCase(loginUserTask.rejected, (state, action) => {
      rejected(state, action);
    });
};
