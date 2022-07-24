import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import constants from "../utils/constants";
import { createTasksAction } from "../store/tasksSlice/asyncActions";
import { selectTasksState } from "../store/tasksSlice/selectors";
import { resetTasksError } from "../store/tasksSlice";

const TaskForm = () => {
  const initialState = {
    title: "",
    notes: "",
    status: constants.statuses[0],
  };

  const dispatch = useDispatch();
  const { formError } = useSelector(selectTasksState);
  const [formData, setFormData] = useState(initialState);

  const handleChange = ({ target: { value, id } }) => {
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createTasksAction(formData));
    setFormData(initialState);
    dispatch(resetTasksError);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a new Task</h3>
      <label>Task Title:</label>
      <input
        className={formError.emptyFields.includes("title") ? "error" : ""}
        id="title"
        value={formData.title}
        onChange={handleChange}
        type="text"
      />

      <label>Status:</label>
      <select
        className={formError.emptyFields.includes("status") ? "error" : ""}
        id="status"
        value={formData.status}
        onChange={handleChange}
      >
        {constants.statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <textarea
        value={formData.notes}
        className={formError.emptyFields.includes("notes") ? "error" : ""}
        id="notes"
        rows="5"
        onChange={handleChange}
      >
        {formData.notes}
      </textarea>
      <button>Create Task</button>
      {formError.hasError && <div className="error">{formError.msg}</div>}
    </form>
  );
};

export default TaskForm;
