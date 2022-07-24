import React from "react";
import { useDispatch } from "react-redux";
import { deleteTasksAction } from "../store/tasksSlice/asyncActions";
import dayjs from "dayjs";

const TaskDetails = ({ task }) => {
  const dispatch = useDispatch();
  const { _id, title, notes, status, timer, createdAt } = task;
  const statuses = {
    pending: "Pending",
    started: "Started",
    completed: "Completed",
  };

  const handleDelete = async (id) => {
    dispatch(deleteTasksAction(id));
  };

  return (
    <div className="task-details">
      <h4>{title}</h4>
      <p>
        <strong>Timer: </strong>
        {parseFloat(timer / 100).toFixed(2)}
      </p>
      <p>
        <strong>Status: </strong>
        {statuses[status]}
      </p>
      <p>Created at: {dayjs(createdAt).format("DD/MM/YYYY")}</p>
      <p>{notes}</p>
      <span
        className="material-symbols-outlined"
        onClick={() => handleDelete(_id)}
      >
        delete
      </span>
    </div>
  );
};

export default TaskDetails;
