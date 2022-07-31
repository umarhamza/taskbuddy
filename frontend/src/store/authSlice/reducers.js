export const reducers = {
  setToken: (state, action) => {
    state.token = action.payload;
    state.isAuthenticated = true;
  },
  resetToken: (state) => {
    state.token = null;
    state.isAuthenticated = false;
  },
};
