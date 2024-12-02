import React from "react";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  return role === "user" ? children : <Navigate to="/login" />;
};

export default UserRoute;
