import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loader from "./Loader";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../ContextAPI/UserContext";
const Navigation = () => {
  const [loading, setLoading] = useState(false);
  const [modal, showModal] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    const verifyUser = async () => {
      await axios
        .get("https://todolist-n0pq.onrender.com/user/verify")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => console.log(err));
    };
    verifyUser();
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(true), 3000);
  }, [user]);

  useEffect(() => {
    const refreshTok = async () => {
      await axios
        .get("https://todolist-n0pq.onrender.com/user/refresh")
        .then((res) => setUser(res.data.user))
        .catch((err) => console.log(err));
    };

    const interval = setInterval(refreshTok, 1000 * 29);
    return () => clearInterval(interval);
  });
  return (
    <>
      {loading ? (
        <>
          <nav className="flex sticky top-0 left-0 right-0 justify-evenly items-center h-[5rem] text-white bg-black">
            <h1 className=" text-xl sm:text-2xl lg:text-3xl whitespace-nowrap">
              TODO-LIST
            </h1>
            <div className=" flex justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-7 xl:gap-10">
              <button>Logout</button>
              {!modal ? (
                <button
                  className="bg-black whitespace-nowrap"
                  onClick={() => showModal(true)}
                >
                  My Profile
                </button>
              ) : (
                <div className="">
                  <span
                    className=" cursor-pointer"
                    onClick={() => showModal(false)}
                  >
                    &times;
                  </span>
                  <p>
                    Name:{" "}
                    <span className=" text-yellow-600 font-bold">
                      {user.name}
                    </span>
                  </p>
                  <p>
                    Email:{" "}
                    <span className=" text-yellow-600 font-bold">
                      {user.email}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </nav>
          <Outlet />
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
};

export default Navigation;
