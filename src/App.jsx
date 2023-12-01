import React from "react";
import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import AuthProvider from "./ContextAPI/AuthProvider";
import Home from "./Components/Home";
const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
