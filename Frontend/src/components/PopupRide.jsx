import React from "react";
import {
    FaUserCircle,
    FaMapMarkerAlt,
    FaLocationArrow,
    FaMoneyBillWave,
    FaRoad,
    FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const PopupRide = ({ setpopup }) => {
    const navigate = useNavigate()
    return (
        <div className="bg-white rounded-t-3xl shadow-2xl p-5 animate-slideUp">

            <div className="flex justify-center mb-4">
                <div className="w-14 h-1.5 rounded-full bg-gray-300"></div>
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-bold text-center">
                🚖 New Ride Request
            </h2>

            <p className="text-center text-gray-500 mt-1">
                You have a new passenger waiting.
            </p>


            <div className="flex items-center justify-between mt-6 bg-gray-100 rounded-2xl p-4">

                <div className="flex items-center gap-3">

                    <FaUserCircle className="text-5xl text-gray-600" />

                    <div>
                        <h3 className="font-bold text-lg">
                            Rahul Sharma
                        </h3>

                        <p className="text-gray-500">
                            ⭐ 4.9 Rating
                        </p>
                    </div>

                </div>

                <div className="text-right">
                    <h2 className="text-xl font-bold">
                        ₹245
                    </h2>

                    <p className="text-gray-500">
                        Cash
                    </p>
                </div>

            </div>


            <div className="mt-6 space-y-5">

                <div className="flex gap-4">
                    <FaMapMarkerAlt className="text-green-600 text-xl mt-1" />

                    <div>
                        <p className="font-semibold">
                            Pickup
                        </p>

                        <p className="text-gray-500 text-sm">
                            Railway Station, Jaipur
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <FaLocationArrow className="text-red-600 text-xl mt-1" />

                    <div>
                        <p className="font-semibold">
                            Destination
                        </p>

                        <p className="text-gray-500 text-sm">
                            World Trade Park, Jaipur
                        </p>
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-3 gap-3 mt-7">

                <div className="bg-gray-100 rounded-xl p-3 text-center">
                    <FaRoad className="mx-auto text-blue-600 text-xl mb-2" />
                    <p className="text-xs text-gray-500">
                        Distance
                    </p>
                    <h4 className="font-bold">
                        8.5 km
                    </h4>
                </div>

                <div className="bg-gray-100 rounded-xl p-3 text-center">
                    <FaClock className="mx-auto text-orange-500 text-xl mb-2" />
                    <p className="text-xs text-gray-500">
                        ETA
                    </p>
                    <h4 className="font-bold">
                        18 min
                    </h4>
                </div>

                <div className="bg-gray-100 rounded-xl p-3 text-center">
                    <FaMoneyBillWave className="mx-auto text-green-600 text-xl mb-2" />
                    <p className="text-xs text-gray-500">
                        Payment
                    </p>
                    <h4 className="font-bold">
                        Cash
                    </h4>
                </div>

            </div>


            <div className="flex gap-3 mt-8">

                <button
                    className="flex-1 bg-red-100 text-red-600 font-bold py-4 rounded-2xl active:scale-95 transition"
                    onClick={() => {
                        setpopup(false)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                >
                    Ignore
                </button>

                <button
                    className="flex-1 bg-green-600 text-white font-bold py-4 rounded-2xl active:scale-95 transition"
                    onClick={() => {
                        setpopup(false)
                        navigate('/map')
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                >
                    Accept Ride
                </button>

            </div>


            <p className="text-center text-gray-400 text-sm mt-4">
                Ride request expires in <span className="font-bold text-red-500">15s</span>
            </p>

        </div>
    );
};

export default PopupRide;