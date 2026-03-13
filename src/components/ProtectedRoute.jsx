import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getSessionUser } from "../lib/auth";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const user = getSessionUser();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;

