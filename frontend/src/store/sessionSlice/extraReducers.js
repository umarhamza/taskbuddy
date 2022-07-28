import { registerUserTask } from "./asyncActions";

export const extraReducers = (builder) => {
  builder
    .addCase(registerUserTask.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(registerUserTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user.email = action.payload.email;
      state.token = action.payload.token;
    })
    .addCase(registerUserTask.rejected, (state, action) => {
      const { message, options } = action.payload;
      state.isLoading = false;
      state.formError.msg = message;
      state.formError.hasError = true;
      state.formError.emptyFields = options?.emptyFields;
    });
};
