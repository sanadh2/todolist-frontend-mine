import React from "react";
import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Navigation from "./Components/Navigation";
import UserContext from "./ContextAPI/UserContext";
const App = () => {
  return (
    <>
      <UserContext>
        <Router>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Navigation />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </Router>
      </UserContext>
    </>
  );
};

export default App;
