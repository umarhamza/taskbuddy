import initialState from "./initialState";

const reducers = {
  setSelectedTask: (state, action) => {
    state.task = state.tasks.filter((task) => task._id === action.payload);
  },
  resetTasksError: (state) => {
    state.error = initialState.error;
  },
};

export default reducers;
