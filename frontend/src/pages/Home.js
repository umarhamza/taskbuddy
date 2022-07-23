import React, { useEffect } from "react";
import TaskDetails from "../components/TaskDetails";
import { useSelector, useDispatch } from "react-redux";
import { selectTasksState } from "../store/tasksSlice/selectors";
import { toast } from "react-toastify";
import { getTasksAction } from "../store/tasksSlice/asyncActions";
import { resetTasksError } from "../store/tasksSlice";
import Spinner from "../components/Spinner";
import TaskForm from "../components/TaskForm";

const Home = () => {
  const dispatch = useDispatch();
  const { tasks, tasksError, isLoading } = useSelector(selectTasksState);

  useEffect(() => {
    dispatch(getTasksAction());
  }, [dispatch]);

  useEffect(() => {
    if (tasksError?.isError) {
      toast.error(tasksError.message);
    } else {
      dispatch(resetTasksError);
    }
  }, [tasksError, dispatch]);

  return (
    <div className="home">
      <div className="tasks">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {tasks &&
              tasks.map((task) => <TaskDetails key={task._id} task={task} />)}
          </>
        )}
      </div>
      <TaskForm />
    </div>
  );
};

export default Home;
