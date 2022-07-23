import React, { useEffect } from "react";
import TaskDetails from "../components/TaskDetails";
import { useSelector, useDispatch } from "react-redux";
import { selectTasks } from "../store/tasksSlice/selectors";
import { toast } from "react-toastify";
import { getTasksAction } from "../store/tasksSlice/asyncActions";

const Home = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  console.log("tasks", tasks);

  useEffect(() => {
    dispatch(getTasksAction());
  }, [dispatch]);

  return (
    <div className="home">
      <div className="tasks">
        {tasks &&
          tasks.map((task) => <TaskDetails key={task._id} task={task} />)}
      </div>
    </div>
  );
};

export default Home;
