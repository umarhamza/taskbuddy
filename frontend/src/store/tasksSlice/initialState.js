import constants from "../../utils/constants";

export const initialState = {
  tasks: [],
  task: { title: "", notes: "", status: constants.statuses, order: 0 },
  isLoading: false,
  error: { msg: "", hasError: false },
  formError: { msg: "", hasError: false },
};
