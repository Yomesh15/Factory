import React from "react";
import { Navigate } from "react-router-dom";

const CaptainProtected = ({ children }) => {
  const token = localStorage.getItem("captainToken");

  if (!token) {
    return <Navigate to="/captainlogin" replace />;
  }

  return children;
};

export default CaptainProtected;