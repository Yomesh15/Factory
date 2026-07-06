import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";

const LookingForDriver = ({ vehicle, pickup, destination }) => {
  return (
    <div className="w-full bg-white rounded-t-3xl p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Looking for a Nearby Driver
      </h2> 

      <div className="flex flex-col items-center">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-44 h-28 object-contain"
        />

        <div className="flex justify-between items-center w-full mt-3">
          <div>
            <h3 className="text-xl font-bold">{vehicle.name}</h3>
            <p className="text-gray-500">{vehicle.arrival}</p>
          </div>

          <h2 className="text-2xl font-bold">{vehicle.price}</h2>
        </div>
      </div>
 
      <div className="mt-8 border rounded-2xl overflow-hidden">
 
        <div className="flex items-start gap-4 p-4 border-b">
          <IoLocationSharp className="text-xl mt-1" />
          <div>
            <h4 className="font-semibold">Your Location</h4>
            <p className="text-gray-500 text-sm">{pickup}</p>
          </div>
        </div>
 
        <div className="flex items-start gap-4 p-4 border-b">
          <FaLocationDot className="text-xl mt-1" />
          <div>
            <h4 className="font-semibold">Destination</h4>
            <p className="text-gray-500 text-sm">{destination}</p>
          </div>
        </div>
 
        <div className="flex items-start gap-4 p-4">
          <MdPayments className="text-xl mt-1" />
          <div>
            <h4 className="font-semibold">Cash</h4>
            <p className="text-gray-500 text-sm">
              Pay after your ride ends
            </p>
          </div>
        </div>
      </div> 

      <div className="flex flex-col items-center mt-8">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

        <p className="mt-4 text-gray-600 text-center">
          Searching Nearby Drivers...
        </p>

        <p className="text-sm text-gray-400 mt-1">
          This usually takes a few seconds.
        </p>
      </div>
    </div>
  );
};

export default LookingForDriver;