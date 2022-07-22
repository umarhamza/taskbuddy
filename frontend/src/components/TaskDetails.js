import React from "react";

const TaskDetails = ({ task }) => {
  const { title, notes, status, timer, createdAt } = task;
  const statuses = {
    pending: "Pending",
    started: "Started",
    completed: "Completed",
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
      <p>{createdAt}</p>
      <p>{notes}</p>
    </div>
  );
};

export default TaskDetails;
