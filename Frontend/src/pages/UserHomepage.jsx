import React, { useRef, useState } from "react";
import map from "../assets/map.jpg";
import factory from "../assets/name.png";

import { FaAngleDown } from "react-icons/fa";

import LocationSearch from "../components/LocationSearch";
import VehiclePanel from "../components/VehiclePanel";

const Homepage = () => {
  const [open, setOpen] = useState(false);

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const [pickupSelected, setPickupSelected] = useState(false);
  const [destinationSelected, setDestinationSelected] = useState(false);

  const [activeInput, setActiveInput] = useState("pickup");

  const destinationRef = useRef(null);

  const showVehiclePanel =
    pickupSelected && destinationSelected;

  return (
    <div className="relative h-full w-full bg-white">

      <div
        className={`absolute inset-0 transition-all duration-500 ${open
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
        <div className="absolute top-6 left-3 z-20">
          <img
            src={factory}
            alt="logo"
            className="w-26 h-22"
          />
        </div>
      )}

      <div
        className={`absolute left-0 right-0 bg-white rounded-t-3xl shadow-xl transition-all duration-500 z-30 ${open ? "top-0 h-dvh" : "top-[65%]"
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
              type="text"
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                setPickupSelected(false);
              }}
              onFocus={() => {
                setOpen(true);
                setActiveInput("pickup");
              }}
              placeholder="Your Location"
              className="w-full bg-gray-100 rounded-xl py-4 pl-16 pr-5 outline-none text-lg mb-4"
            />

            <input
              ref={destinationRef}
              type="text"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setDestinationSelected(false);
              }}
              onFocus={() => {
                setOpen(true);
                setActiveInput("destination");
              }}
              placeholder="Your Destination"
              className="w-full bg-gray-100 rounded-xl py-4 pl-16 pr-5 outline-none text-lg"
            />
          </div>

          {open && (
            <>
              {showVehiclePanel ? (
                <div className="mt-6">
                  <VehiclePanel
                    pickup={pickup}
                    destination={destination}
                  />
                </div>
              ) : (
                <div className="mt-6 h-[450px] overflow-y-auto">
                  <LocationSearch
                    search={
                      activeInput === "pickup"
                        ? pickup
                        : destination
                    }
                    onSelect={(location) => {
                      if (activeInput === "pickup") {
                        setPickup(location);
                        setPickupSelected(true);

                        setActiveInput("destination");

                        setTimeout(() => {
                          destinationRef.current?.focus();
                        }, 0);
                      } else {
                        setDestination(location);
                        setDestinationSelected(true);
                      }
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;