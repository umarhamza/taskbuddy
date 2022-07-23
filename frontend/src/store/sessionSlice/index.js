import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "null",
};

const sessionSlice = createSlice({
  name: "sessionDetails",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    resetToken: (state, action) => {
      state.token = null;
    },
  },
});

export const { setToken, resetToken } = sessionSlice.actions;

export default sessionSlice.reducer;
