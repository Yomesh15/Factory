import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const UserProtected = ({ children }) => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserProtected;