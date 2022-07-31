export const initialState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  success: false,
  user: {
    email: null,
  },
  formError: {
    msg: "",
    hasError: false,
    emptyFields: [],
  },
};
