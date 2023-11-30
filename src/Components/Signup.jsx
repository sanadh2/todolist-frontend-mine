import React from "react";
import axios from "axios";
import "./signUp.css";
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const signUp = async () => {
    const options = JSON.stringify(formData);
    console.log(formData);
    const res = await axios.post("http://localhost:2222/user/signUp", formData);
    console.log(res.data);
    return res;
  };

  const signUpHandler = () => {
    signUp().then(() => console.log("connected"));
  };

  const LoginDetails = () => {
    return (
      <>
        <div className="">
          <h1>please enter details in every field </h1>
          <button>close</button>
        </div>
      </>
    );
  };

  return (
    <div className="flex justify-center items-center text-white h-[93.5vh] md:h-[100vh] bg-white dark:bg-slate-700">
      <div className="flex gap-10 flex-col justify-center items-center border-2  border-black outline-none px-10 py-5">
        <h1 className="font-bold text-3xl">Sign Up</h1>
        <div className="flex flex-col justify-center items-center w-[20rem]  gap-5">
          <input
            type="text"
            placeholder="name"
            name="name"
            required
            className=" bg-slate-100 dark:bg-slate-800 pl-3 h-10 w-[17rem]"
            onChange={changeHandler}
          />
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
            onClick={signUpHandler}
          >
            Submit
          </button>
          <h2>
            New to this{"     "}
            <span
              className="underline text-green-400"
              onClick={() => navigate("/")}
            >
              Log in
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
