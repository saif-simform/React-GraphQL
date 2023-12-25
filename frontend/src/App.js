import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./views/authentication/Login";
import ProjectsList from "./views/projects/List";
import ProjectsView from "./views/projects/View";
import LogsView from "./views/timeLogs/View";
import NotFound from "./views/NotFound";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/projects" element={<ProjectsList />}></Route>
        <Route
          path="/projects/:projectName/:id"
          element={<ProjectsView />}
        ></Route>
        <Route
          path="/projects/:projectName/task/:id"
          element={<LogsView />}
        ></Route>
        <Route path="/not-found" element={<NotFound />}></Route>
        <Route path="/" element={<Navigate replace to="/login" />}></Route>
        <Route path="*" element={<Navigate replace to="/not-found" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
