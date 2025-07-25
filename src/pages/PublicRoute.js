import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (token || isAdmin) {
    return <Navigate to="/sites" replace />;
  }

  return children;
};

export default PublicRoute;
