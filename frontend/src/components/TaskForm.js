import React, { useState } from "react";
import constants from "../utils/constants";

const TaskForm = () => {
  const initialState = {
    title: "",
    notes: "",
    status: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = ({ target: { value, id } }) => {};
  return (
    <form onSubmit={() => {}}>
      <h3>Add a new Task</h3>
      <label>Task Title:</label>
      <input
        value={formData.title}
        onChange={handleChange}
        id="title"
        type="text"
      />

      <label>Status:</label>
      <select value={formData.status} onChange={handleChange} id="title">
        {constants.statuses.map((status) => (
          <option value={status}>{status}</option>
        ))}
      </select>
    </form>
  );
};

export default TaskForm;
