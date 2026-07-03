import React from "react";
import home from "../assets/home.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Hero Image */}
      <div className="flex-1">
        <img
          src={home}
          alt="Factory"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Bottom Section */}
      <div className="bg-black px-6 py-6">
        <h1 className="text-white text-3xl font-bold leading-tight">
          Get Started with Factory
        </h1>

        <p className="text-gray-400 mt-3 text-base">
          Ride smarter, safer and faster with Factory.
        </p>

        <Link to="/login">
          <button className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 active:scale-95 transition-all duration-200 text-black font-semibold py-4 rounded-2xl text-lg">
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;