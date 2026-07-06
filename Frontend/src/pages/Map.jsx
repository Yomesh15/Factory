import React, { useState } from "react";
import CompleteRide from "../components/CompleteRide.jsx";
import { FaMapMarkerAlt, FaLocationArrow } from "react-icons/fa";
import CaptainNavbar from "../components/CaptainNavbar.jsx";

const Map = () => {
    const [showCompleteRide, setShowCompleteRide] = useState(false);

    return (
        <>
            <CaptainNavbar/>
            <div className="relative h-screen">
 
                {!showCompleteRide && (
                    <>
                        <div
                            className="h-full w-ful object-cover l bg-cover bg-center relative"
                            style={{
                                backgroundImage:
                                    "url('https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif')",
                            }}
                        > 
                            <div className="absolute top-1/2 left-1/2">
                                <FaMapMarkerAlt className="text-5xl text-blue-600 animate-bounce" />
                            </div>
 
                            <div className="absolute top-40 right-28">
                                <FaLocationArrow className="text-4xl text-red-600" />
                            </div>
 
                            <div className="absolute top-5 left-5 bg-white rounded-xl p-4 shadow-lg">
                                <h2 className="font-bold text-lg">Passenger</h2>
                                <p>Rahul Sharma</p>
                                <p className="text-sm text-gray-500">
                                    ETA : 6 min
                                </p>
                                <p className="text-sm text-gray-500">
                                    Distance : 2.8 km
                                </p>
                            </div>
 
                            <button
                                onClick={() => setShowCompleteRide(true)}
                                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-8 py-4 rounded-full font-bold shadow-xl"
                            >
                                Complete Ride
                            </button>
                        </div>
                    </>
                )}
 
                {showCompleteRide && (
                    <CompleteRide setShowCompleteRide={setShowCompleteRide} />
                )}
            </div>

        </>
    );
};

export default Map;