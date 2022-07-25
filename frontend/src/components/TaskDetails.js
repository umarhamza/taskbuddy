import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTasksAction,
  updateTasksAction,
} from "../store/tasksSlice/asyncActions";
import dayjs from "dayjs";
import classNames from "classnames";

const TaskDetails = ({ task }) => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(task.timer);
  const [startTimer, setStartTimer] = useState(false);
  const { _id, title, notes, status, createdAt } = task;
  const statuses = {
    pending: "Pending",
    started: "Started",
    completed: "Completed",
  };

  const handleDelete = async (id) => {
    dispatch(deleteTasksAction(id));
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    return `${minutes}:${seconds}`;
  };

  const handleStartTimer = () => {
    if (!startTimer) {
      setStartTimer((prev) => !prev);
    } else {
      updateTimer();
    }
  };

  const updateTimer = useCallback(() => {
    dispatch(updateTasksAction({ formData: { timer }, id: _id }));
  }, [_id, dispatch, timer]);

  useEffect(() => {
    let timerInterval;

    if (startTimer) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [startTimer, timer, updateTimer]);

  return (
    <div className="task-details">
      <h4>{title}</h4>
      <div className="task-details--row">
        <p>
          <strong>Status: </strong>
          {statuses[status]}
        </p>
      </div>
      <div className="task-details--row">
        <p>
          <strong>Created at:</strong> {dayjs(createdAt).format("DD/MM/YYYY")}
        </p>
      </div>
      <div className="task-details--timer task-details--row">
        <p>
          <strong>Timer: </strong>
          {formatTime(timer)}
        </p>
        <span
          className={classNames("play-pause material-symbols-outlined", {
            playing: startTimer,
          })}
          onClick={handleStartTimer}
        >
          {startTimer ? "pause" : "play_arrow"}
        </span>
      </div>
      <div className="task-details--row">
        <p>
          <strong>Notes:</strong>
        </p>
        <p>{notes}</p>
      </div>
      <span
        className="delete-icon material-symbols-outlined"
        onClick={() => handleDelete(_id)}
      >
        delete
      </span>
    </div>
  );
};

export default TaskDetails;
