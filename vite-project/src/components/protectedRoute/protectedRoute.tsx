import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const ProtectedRoute: React.FC = ({ children }:any) => {
  let auth = localStorage.getItem("token");

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
