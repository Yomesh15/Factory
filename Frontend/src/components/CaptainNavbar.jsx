import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import name from "../assets/name.png";

const CaptainNavbar = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-5 py-3">
 
        <div className="flex items-center">
          <img
            src={name}
            alt="Logo"
            className="h-10 object-contain"
          />
        </div> 
        <div className="hidden sm:flex items-center bg-green-50 border border-green-200 px-4 py-2 rounded-full">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse mr-2"></span>

          <span className="text-green-700 font-semibold tracking-wide">
            Captain Mode
          </span>
        </div>
 
        <button
          onClick={() => navigate("/captain-login")}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          title="Logout"
        >
          <IoLogOutOutline className="text-2xl" />
        </button>

      </div>
    </header>
  );
};

export default CaptainNavbar;