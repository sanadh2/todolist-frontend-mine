import React, { useState } from "react";
import "./signUp.css";
import axios from "axios";
axios.defaults.withCredentials = true;

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const login = async () => {
    const res = await axios.post("http://localhost:2222/user/login", formData);
    return res;
  };

  const logInHandler = () => {
    login()
      .then((res) => console.log(res))
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data.msg);
        }
        console.log(err);

        return err;
      })
      .then((err) => {
        if (err) return 1;
        navigate("/home");
      });
  };
  return (
    <div className="flex justify-center items-center text-white h-[93.5vh] md:h-[100vh] bg-white dark:bg-slate-700">
      <div className="flex gap-10 flex-col justify-center items-center border-2  border-black outline-none px-10 py-5">
        <h1 className="font-bold text-3xl">Login</h1>
        <div className="flex flex-col justify-center items-center w-[20rem]  gap-5">
          <input
            type="email"
            name="email"
            required
            placeholder="email"
            className=" bg-slate-100 dark:bg-slate-800 pl-3 h-10 w-[17rem]"
            onChange={changeHandler}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            required
            className=" bg-slate-100 dark:bg-slate-800 pl-3 h-10 w-[17rem]"
            onChange={changeHandler}
          />
          <button
            type="submit"
            className="burron px-4 py-1  bg-green-400 text-lg  transition-all"
            onClick={logInHandler}
          >
            Submit
          </button>
          <h2>
            New to this{"     "}{" "}
            <span
              className="underline text-green-400 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up{" "}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
