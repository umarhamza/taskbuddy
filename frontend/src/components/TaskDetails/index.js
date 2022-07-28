import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTasksAction,
  updateTasksAction,
} from "../../store/tasksSlice/asyncActions";
import dayjs from "dayjs";
import classNames from "classnames";
import { Notes, Status } from "./components";

const TaskDetails = ({ task }) => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(task.timer);
  const [timerStarted, setTimerStarted] = useState(false);
  const { _id, title, createdAt } = task;

  const handleDelete = async (id) => {
    dispatch(deleteTasksAction(id));
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    return `${minutes}:${seconds}`;
  };

  const updateTimer = () => {
    setTimerStarted(false);
    dispatch(updateTasksAction({ formData: { ...task, timer }, id: _id }));
  };

  const handleStartTimer = () => {
    if (!timerStarted) {
      setTimerStarted(true);
    } else {
      updateTimer();
    }
  };

  useEffect(() => {
    let timerInterval;

    if (timerStarted) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [timerStarted, timer]);

  return (
    <div className="task-details">
      <h4>{title}</h4>
      <div className="task-details--row">
        <div className="status">
          <strong>Status: </strong>
          <Status task={task} />
        </div>
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
            playing: timerStarted,
          })}
          onClick={handleStartTimer}
        >
          {timerStarted ? "pause" : "play_arrow"}
        </span>
      </div>
      <div className="task-details--row">
        <p>
          <strong>Notes:</strong>
        </p>
        <Notes task={task} />
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
