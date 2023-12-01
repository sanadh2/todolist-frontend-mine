import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../ContextAPI/AuthProvider";
import axios from "axios";
import Loader from "./Loader";

const Home = () => {
  const { user, setUser, tasks, setTasks } = useContext(AuthContext);
  const [title, setTitle] = useState();
  const [completed, setCompleted] = useState(false);
  const [flag, setFlag] = useState(true);
  const [foo, soo] = useState(true);
  const button = useRef(null);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get("http://localhost:2222/user/verify");
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    const refreshTok = async () => {
      try {
        const res = await axios.get("http://localhost:2222/user/refresh");
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    if (flag) {
      verifyUser();
      setFlag(false);
    }

    if (!flag) {
      const interval = setInterval(() => refreshTok(), 29 * 1000);
      return () => clearInterval(interval);
    }
  }, [flag, setUser]);

  const addTask = async (title, user) => {
    try {
      const res = await axios.post("http://localhost:2222/task/new-task", {
        title: title,
        userID: user._id,
      });
      soo(!foo);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(tasks);

    const findTasks = async (user) => {
      try {
        const res = await axios.get(
          `http://localhost:2222/user/user-tasks/${user._id}`
        );
        setTasks(res.data.tasks);
      } catch (err) {
        // console.log(err);
      }
    };

    if (!flag) {
      findTasks(user);
    }
  }, [flag, user, foo]);

  const handlechange = (e) => {
    e.preventDefault();
    if (e.target.value.length > 20) return;
    setTitle(e.target.value);
  };

  const editTask = (task) => {
    button.current.innerText = "Update Task";
    setTitle(task.title);
  };

  const updateTask = async (title, task) => {
    try {
      const res = await axios.patch(`http://localhost:2222/task/update-task`, {
        title: title,
        id: task._id,
        completed: !task.completed,
      });
      setTasks(res.data.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  const addUpdateTask = () => {
    if (button.current.innerText == "Update Task") {
      return updateTask();
    }
    addTask();
  };

  return (
    <div className="flex flex-col min-h-screen w-screen bg-white text-black dark:text-white dark:bg-slate-800 overflow-hidden box-border">
      <nav className="h-12 md:h-16  w-screen  shadow-sm whitespace-nowrap shadow-zinc-300  md:shadow-black   flex flex-row justify-evenly items-center">
        <h1 className="text-3xl md:block text-green-500">Todo List</h1>
        <button className=" md:text-xl text-base ">Log Out</button>
      </nav>
      {user ? (
        <div className=" mt-10  w-screen flex flex-col items-center justify-center">
          <header className=" w-3/4 sm:w-1/2 h-full  flex flex-wrap gap-4 justify-center items-center">
            <input
              type="text"
              placeholder="Task Title "
              value={title}
              onChange={handlechange}
              className="pl-3 h-10  w-3/4 md:w-1/2 flex-auto capitalize text-green-500 font-semibold placeholder:font-thin placeholder:font-mono flex-shrink-0  border-green-500 border-2 bg-stone-50 dark:bg-slate-700 rounded-md"
            />
            <div className="flex gap-4 flex-nowrap w-full whitespace-nowrap">
              <button
                ref={button}
                type="submit"
                onClick={() => addTask(title, user)}
                className="pl-3 h-10 px-4 py-1 flex-auto min-w-40  w-[7rem] bg-green-500  rounded-md"
              >
                Add Task
              </button>
              <button
                type="reset"
                className="pl-3 h-10 px-4 py-1 flex-auto w-[7rem] bg-green-500  rounded-md"
              >
                Reset
              </button>
            </div>
          </header>
          <section className="flex flex-col gap-2  bg-stone-100 dark:bg-slate-700 rounded-md w-3/4 py-5 sm:w-1/2 mt-10 min">
            {tasks ? (
              <>
                {tasks.map((task) => (
                  <div
                    className="flex flex-nowrap flex-row h-10 rounded-xl bg-slate-600  justify-center items-center "
                    key={task._id}
                  >
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      value={completed}
                      onClick={() => {
                        setCompleted({ id: completed });
                      }}
                      className=" w-5 mx-10"
                    />
                    <p
                      className=" whitespace-nowrap w-1/2 mx-10"
                      onClick={() => editTask(task)}
                    >
                      {task.title}
                    </p>
                    <button type="button" className="w-5 mx-10">
                      Delete
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <>
                <p className=" text-center">No tasks</p>
              </>
            )}
          </section>
        </div>
      ) : (
        <>
          <Loader />
        </>
      )}
    </div>
  );
};

export default Home;
