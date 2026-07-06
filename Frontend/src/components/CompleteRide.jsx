import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CaptainNavbar from "./CaptainNavbar";

const CompleteRide = ({ setShowCompleteRide }) => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate()

    const verifyRide = () => {
        if (otp === "1234") {
            toast.success("Ride Completed 🎉")
            navigate('/captainhomepage')
        } else {
            toast.error("Invalid OTP")
        }
    };

    return (
        <>
            <CaptainNavbar />
            <div className="h-screen bg-white p-6 flex flex-col justify-center">

                <h1 className="text-3xl font-bold text-center">
                    Complete Ride
                </h1>

                <p className="text-center text-gray-500 mt-2">
                    Ask Passenger for OTP
                </p>

                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="border mt-8 rounded-xl p-4 text-center text-2xl"
                />

                <button
                    onClick={verifyRide}
                    className="bg-green-600 text-white py-4 rounded-xl mt-5 font-bold"
                >
                    Verify OTP
                </button>

                <button
                    onClick={() => setShowCompleteRide(false)}
                    className="bg-gray-200 py-4 rounded-xl mt-3"
                >
                    Back to Map
                </button>

            </div>

        </>
    );
};

export default CompleteRide;