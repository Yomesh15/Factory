import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("userToken");
    navigate("/");
  }, [navigate]);

  return null; 
};

export default Logout;