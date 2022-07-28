export const getErrorMessage = ({ error }) => {
  const msg = error?.response?.data?.msg;
  const options = error?.response?.data?.options;
  const message = msg || error.toString();
  return { message, options };
};
