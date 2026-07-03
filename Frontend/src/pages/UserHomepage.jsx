import React, { useState } from "react";
import map from "../assets/map.jpg";
import name from "../assets/name.png";
import factory from "../assets/name.png";

import { FaAngleDown } from "react-icons/fa";


const Homepage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          open
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <img
          src={map}
          alt="map"
          className="h-full w-full object-cover object-top"
        />
      </div>

      {!open && (
        <div className="absolute top-6 left-3 z-20 flex items-center gap-2">
          <img
            src={factory}
            className="w-26 h-22"
            alt=""
          />

        </div>
      )}

      <div
        className={`absolute left-0 right-0 bg-white rounded-b-3xl shadow-xl transition-all duration-500 z-30 ${
          open ? "top-0" : "top-[65%]"
        }`}
      >
        {open && (
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-4 text-3xl"
          >
            <FaAngleDown />
          </button>
        )}

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8">
            Start a new Ride
          </h2>

          <div className="relative">
            <div className="absolute left-5 top-6 flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-black"></div>

              <div className="w-[2px] h-12 bg-gray-400"></div>

              <div className="w-3 h-3 rounded-full bg-black"></div>
            </div>

            <input
              onFocus={() => setOpen(true)}
              placeholder="Your Location"
              className="w-full bg-gray-100 rounded-xl py-4 pl-16 pr-5 outline-none text-lg mb-4"
            />

            <input
              onFocus={() => setOpen(true)}
              placeholder="Your Destination"
              className="w-full bg-gray-100 rounded-xl py-4 pl-16 pr-5 outline-none text-lg"
            />
          </div>

          {open && (
            <div className="mt-8 h-[450px] flex items-center justify-center text-gray-400">
              Search results here...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;