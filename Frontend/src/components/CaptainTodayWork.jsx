import React from "react";
import {
  FaStar,
  FaClock,
  FaRoute,
  FaWallet,
  FaCar,
} from "react-icons/fa";

const CaptainTodayWork = () => {
  return (
    <div className="bg-white rounded-t-3xl shadow-2xl p-5 mt-2">
 
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="driver"
          className="w-20 h-20 rounded-full object-cover border-4 border-black"
        />

        <div className="flex-1">
          <h2 className="text-xl font-bold">Rahul Sharma</h2>

          <p className="text-gray-500">
            Uber Captain • Toyota Innova
          </p>

          <div className="flex items-center gap-1 mt-1">
            <FaStar className="text-yellow-500" />
            <span className="font-semibold">4.96</span>

            <span className="text-gray-400">
              (1,248 Trips)
            </span>
          </div>
        </div>
      </div>
 

      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="bg-gray-100 rounded-2xl p-4">
          <FaWallet className="text-green-600 text-2xl mb-2" />
          <p className="text-gray-500 text-sm">Today's Earnings</p>
          <h3 className="text-2xl font-bold">₹2,340</h3>
        </div>

        <div className="bg-gray-100 rounded-2xl p-4">
          <FaRoute className="text-blue-600 text-2xl mb-2" />
          <p className="text-gray-500 text-sm">Trips Today</p>
          <h3 className="text-2xl font-bold">18</h3>
        </div>

      </div>
 

      <div className="mt-7">

        <h3 className="font-bold text-lg mb-4">
          Work Statistics
        </h3>

        <div className="space-y-4">

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <FaClock className="text-blue-500" />
              Today Online
            </span>

            <span className="font-bold">8h 35m</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <FaClock className="text-purple-500" />
              This Week
            </span>

            <span className="font-bold">46h 20m</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <FaClock className="text-red-500" />
              This Month
            </span>

            <span className="font-bold">184h</span>
          </div>

          <div className="flex justify-between">
            <span>Acceptance Rate</span>
            <span className="font-bold text-green-600">
              98%
            </span>
          </div>

          <div className="flex justify-between">
            <span>Cancellation Rate</span>
            <span className="font-bold text-red-500">
              1%
            </span>
          </div>

          <div className="flex justify-between">
            <span>Total Distance</span>
            <span className="font-bold">
              182 km
            </span>
          </div>

          <div className="flex justify-between">
            <span>Total Trips</span>
            <span className="font-bold">
              1,248
            </span>
          </div>

          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <FaCar />
              Vehicle
            </span>

            <span className="font-bold">
              Toyota Innova
            </span>
          </div>

        </div>

      </div>
 

      <div className="mt-7 bg-black text-white rounded-2xl p-5">

        <p className="text-gray-300">
          Weekly Bonus Progress
        </p>

        <div className="w-full bg-gray-700 h-3 rounded-full mt-3 overflow-hidden">
          <div className="bg-green-500 h-3 rounded-full w-4/5"></div>
        </div>

        <p className="mt-3 font-semibold">
          80% Complete • Earn ₹1,200 More
        </p>

      </div>

    </div>
  );
};

export default CaptainTodayWork;