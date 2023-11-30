import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [title, setTitle] = useState("");

  useEffect(() => {}, []);

  const addTask = async () => {
    await axios.post("https://todolist-n0pq.onrender.com/task/new-task", {
      title,
    });
  };
  const addTaskHandler = (e) => {
    e.preventDefault();
    addTask();
  };

  return (
    <div className=" min-h-screen w-full flex justify-center items-center text-black dark:text-white bg-white dark:bg-slate-700">
      <section className="bg-slate-800 w-3/4 border p-10 gap-10  h-[20rem] flex flex-col  items-center ">
        <h1 className="text-2xl">Task-List</h1>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="task"
          className="pl-3 h-10 border-green-400 border bg-transparent"
          id=""
        />
        <button
          className="bg-green-400 px-4 py-1 font-semibold"
          onClick={addTaskHandler}
        >
          Add Task
        </button>
      </section>
    </div>
  );
};

export default Home;
