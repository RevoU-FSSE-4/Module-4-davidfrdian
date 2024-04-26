import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LoginForm from "./components/Login";
import RegistrationForm from "./components/Register";
import { NotFound } from "./components/NotFound";

function App() {

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/" element={<RegistrationForm />}></Route>


        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
      </div>
  );
}

export default App;
