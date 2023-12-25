import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from "../views/authentication/Login";
import ProjectsList from "../views/projects/List";

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/projects" element={<ProjectsList />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
