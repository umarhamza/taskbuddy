import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskDetails from "../components/TaskDetails";

const Home = () => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get("/api/tasks");
        console.log("response", data);
        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, []);

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
