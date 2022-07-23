const reducers = {
  setToken: (state, action) => {
    state.token = action.payload;
  },
  resetToken: (state, action) => {
    state.token = null;
  },
};

export default reducers;
