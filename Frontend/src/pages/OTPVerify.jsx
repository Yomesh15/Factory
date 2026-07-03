import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const OTPVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email || localStorage.getItem("otpEmail");

  const role =
    location.state?.role || localStorage.getItem("otpRole") || "user";

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      navigate(role === "captain" ? "/captain-signup" : "/signup");
    }
  }, [email, role, navigate]);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) {
      return toast.error("Please enter complete OTP");
    }

    try {
      setLoading(true);

      const url =
        role === "captain"
          ? `${import.meta.env.VITE_API_URL}/captain/verify-otp`
          : `${import.meta.env.VITE_API_URL}/verify-mail`;

      const res = await axios.post(
        url,
        {
          email,
          otp: enteredOtp,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        localStorage.removeItem("otpEmail");
        localStorage.removeItem("otpRole");

        toast.success("Registration Successful 🎉");

        navigate(role === "captain" ? "/captain-login" : "/login");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const url =
        role === "captain"
          ? `${import.meta.env.VITE_API_URL}/resend-otp`
          : `${import.meta.env.VITE_API_URL}/resend-otp`;

      const res = await axios.post(
        url,
        {
          email,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        setOtp(["", "", "", ""]);

        inputRefs.current[0]?.focus();

        setTimer(30);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to resend OTP"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-5">
      <div className="w-full max-w-sm">

        <h1 className="text-4xl font-bold text-yellow-400">
          Factory
        </h1>

        <h2 className="text-2xl font-semibold text-white mt-10">
          Verify OTP
        </h2>

        <p className="text-gray-400 mt-2">
          Enter the 4-digit code sent to
        </p>

        <p className="text-yellow-400 text-sm mt-1 break-all">
          {email}
        </p>

        <div className="flex justify-between mt-10 gap-3">

          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e) =>
                handleKeyDown(e, index)
              }
              className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-700 text-white text-2xl font-bold text-center outline-none focus:border-yellow-400"
            />
          ))}

        </div>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full mt-10 bg-yellow-400 hover:bg-yellow-500 active:scale-95 transition-all duration-200 text-black font-semibold py-4 rounded-xl text-lg"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="text-center mt-6">

          {timer > 0 ? (
            <p className="text-gray-400">
              Resend OTP in{" "}
              <span className="text-yellow-400 font-semibold">
                {timer}s
              </span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-yellow-400 font-semibold hover:underline"
            >
              Resend OTP
            </button>
          )}

        </div>

      </div>
    </div>
  );
};

export default OTPVerify;