import React from "react";
import "./App.css";
import Login from "./components/auth/login";
import Registration from "./components/auth/registration";
import Project from "./components/Projects/index";
import Employee from "./components/Employee/index";
import ResetPassword from "./components/auth/resetpassword";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import AdminLayout from "./layout/index";
import PrivateRoute from "./routes/PrivateRoute";
import { NoMatch } from "./routes/NoMatch";
import ProjectDetails from "./components/Projects/projectDetails";

/**
 * Home Page of the Application
 * @return {JSX.Element}
 */

const App: React.FC = () => {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="forgot_password" element={<ResetPassword />} />
          <Route path="registration" element={<Registration />} />
          <Route path="*" element={<NoMatch />}></Route>
          <Route
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="projects" element={<Project />} />
            <Route path="project_details" element={<ProjectDetails />} />
            <Route path="users" element={<Employee />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
