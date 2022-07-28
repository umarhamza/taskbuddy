import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTasksAction } from "../../store/tasksSlice/asyncActions";
import constants from "../../utils/constants";

export const Status = ({ task }) => {
  const [status, setStatus] = useState(task.status);
  const [editMode, setEditMode] = useState(false);
  const { statusTitles, statuses } = constants;
  const dispatch = useDispatch();

  const handleSave = (value) => {
    setStatus(value);
    setEditMode(false);
    dispatch({ formData: { ...task, status: value }, id: task._id });
  };

  return editMode ? (
    <label htmlFor="status" className="status">
      {statuses.map((value) => (
        <>
          <input
            key={value}
            id="status"
            name="status"
            type="radio"
            value={status}
            onClick={() => handleSave(value)}
          />
          {value}
        </>
      ))}
    </label>
  ) : (
    <p onClick={() => setEditMode(true)}>{statusTitles[status]}</p>
  );
};

export const Notes = ({ task }) => {
  const [notes, setNotes] = useState(task.notes);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const handleSave = () => {
    setEditMode(false);
    dispatch(updateTasksAction({ formData: { ...task, notes }, id: task._id }));
  };

  return editMode ? (
    <div className="editmode">
      <textarea value={notes} onChange={({ target }) => setNotes(target.value)}>
        {notes}
      </textarea>
      <button className="link" onClick={handleSave}>
        Save
      </button>
    </div>
  ) : (
    <p onClick={() => setEditMode(true)} id="notes">
      {notes}
    </p>
  );
};
