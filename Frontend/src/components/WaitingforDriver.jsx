import React from "react";
import {
    FaPhoneAlt,
    FaCommentDots,
    FaStar,
    FaMapMarkerAlt,
    FaCar,
    FaUserCircle,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkedAlt } from "react-icons/fa";


const WaitingforDriver = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const { vehicle, pickup, destination } = state || {};

    if (!vehicle) {
        return (
            <div className="text-center mt-10">
                No Ride information found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-5">

            <div className="text-center">
                <AiOutlineLoading3Quarters className="mx-auto text-4xl animate-spin text-black" />

                <h1 className="text-3xl font-bold mt-4">
                    Driver is on the way
                </h1>

                <p className="text-gray-500 mt-2">
                    Please wait while your driver reaches the pickup location.
                </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg mt-8 p-6">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">

                        <FaUserCircle className="text-6xl text-gray-400" />

                        <div>

                            <h2 className="text-2xl font-bold">
                                {vehicle.driverName}
                            </h2>

                            <div className="flex items-center gap-1 text-yellow-500">
                                <FaStar />
                                <span>{vehicle.driverRating}</span>
                            </div>

                        </div>

                    </div>

                    <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-28 object-contain"
                    />

                </div>

            </div>

            <div className="bg-white rounded-3xl shadow-lg mt-5 p-6">

                <h2 className="text-xl font-bold mb-5">
                    Vehicle Details
                </h2>

                <div className="space-y-4">

                    <div className="flex justify-between">
                        <span>Vehicle</span>
                        <span>{vehicle.vehicleModel}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Color</span>
                        <span>{vehicle.vehicleColor}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Number Plate</span>
                        <span className="font-semibold">
                            {vehicle.vehicleNumber}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>Arrival</span>
                        <span>{vehicle.arrival}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Fare</span>
                        <span className="font-bold">
                            {vehicle.price}
                        </span>
                    </div>

                </div>

            </div>


            <div className="bg-white rounded-3xl shadow-lg mt-5 p-6">

                <div className="flex gap-4">

                    <FaMapMarkerAlt
                        className="text-green-600 mt-1"
                        size={22}
                    />

                    <div>
                        <p className="font-semibold">Pickup</p>
                        <p className="text-gray-600">
                            {pickup}
                        </p>
                    </div>

                </div>

            </div>

            <div className="bg-white rounded-3xl shadow-lg mt-5 p-6">

                <div className="flex gap-4">

                    <MdLocationOn
                        className="text-red-600 mt-1"
                        size={24}
                    />

                    <div>
                        <p className="font-semibold">
                            Destination
                        </p>

                        <p className="text-gray-600">
                            {destination}
                        </p>

                    </div>

                </div>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">

                <button
                    className="bg-green-600 text-white py-4 rounded-2xl flex justify-center items-center gap-3 hover:bg-green-700 transition"
                >
                    <FaPhoneAlt />
                    Call Driver
                </button>

                <button
                    className="bg-blue-600 text-white py-4 rounded-2xl flex justify-center items-center gap-3 hover:bg-blue-700 transition"
                >
                    <FaCommentDots />
                    Chat
                </button>

            </div>


            <button
                onClick={() =>
                    navigate("/driverlocation", {
                        state: {
                            vehicle,
                            pickup,
                            destination,
                        },
                    })
                }
                className="w-full mt-5 bg-black hover:bg-gray-900 text-white py-4 rounded-2xl flex justify-center items-center gap-3 transition"
            >
                <FaMapMarkedAlt size={20} />
                View Driver Location
            </button>

            <button
                className="w-full mt-5 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl text-lg font-semibold transition"
            >
                Cancel Ride
            </button>

            <div className="mt-8 text-center text-sm text-gray-500">
                Share your OTP with the driver only after the vehicle arrives.
            </div>

        </div>
    );
};

export default WaitingforDriver;