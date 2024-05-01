import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/Login";
import RegistrationForm from "./components/Register";
import { NotFound } from "./components/NotFound";
import PrivateRoute from "./Route/PrivateRoute";
import Categories from "./components/Categories";


function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<LoginForm />}></Route>
        <Route path="/registration" element={<RegistrationForm />}></Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/categories" element={<Categories />} />
        </Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
