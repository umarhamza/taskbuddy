export const getErrorMessage = ({ error }) => {
  const msg = error?.response?.data?.msg;
  const options = error?.response?.data?.options;
  const message = msg || error.toString();
  return { message, options };
};

export const setSessionToken = (token) => {
  sessionStorage.setItem("nekot", token);
};

export const removeSessionToken = (token) => {
  sessionStorage.removeItem("nekot");
};

export const getSessionToken = () => {
  return sessionStorage.getItem("nekot");
};
