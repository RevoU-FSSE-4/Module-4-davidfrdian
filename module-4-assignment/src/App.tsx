import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/Login";
import RegistrationForm from "./components/Register";
import Category from "./components/Category";
import { NotFound } from "./components/NotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/register" element={<RegistrationForm />}></Route>
        <Route path="/category" element={<Category />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
