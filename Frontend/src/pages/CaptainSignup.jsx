import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import name from "../assets/name.png";

const CaptainSignup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    vehicle: {
      color: "",
      plate: "",
      capacity: "",
      vehicleType: "",
    },
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleVehicleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      vehicle: {
        ...prev.vehicle,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);
      console.log(form);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/captain/register`,
        form
      );

      if (res.data.success) {
        toast.success("OTP sent to your email 📧");
        
        localStorage.setItem("otpEmail", form.email);
        localStorage.setItem("otpRole", "captain");

        navigate("/otp-verify", {
          state: {
            email: form.email,
            role: "captain",
          },
        });
      }

    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);

      if (error.response?.data?.errors?.length > 0) {
        toast.error(error.response.data.errors[0].msg);
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center px-5 pt-30 pb-10 relative overflow-y-auto">

      <div className="absolute top-6 left-6 z-10">
        <img
          src={name}
          alt="Factory"
          className="w-32 sm:w-40 md:w-48 object-contain"
        />
      </div>

      <div className="w-full max-w-xl mt-1 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-400">
            Captain Sign Up
          </h1>

          <p className="text-gray-400 mt-2">
            Register as a Factory Captain.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={form.fullname}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-4 text-white outline-none focus:border-yellow-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-4 text-white outline-none focus:border-yellow-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-4 text-white outline-none focus:border-yellow-400"
          />


          <h2 className="text-lg font-semibold text-yellow-400 pt-2">
            Vehicle Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="color"
              placeholder="Vehicle Color"
              value={form.vehicle.color}
              onChange={handleVehicleChange}
              required
              className="rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-4 text-white outline-none focus:border-yellow-400"
            />

            <input
              type="text"
              name="plate"
              placeholder="Plate Number"
              value={form.vehicle.plate}
              onChange={handleVehicleChange}
              required
              className="rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-4 text-white outline-none focus:border-yellow-400"
            />

            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={form.vehicle.capacity}
              onChange={handleVehicleChange}
              required
              className="rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-4 text-white outline-none focus:border-yellow-400"
            />

            <select
              name="vehicleType"
              value={form.vehicle.vehicleType}
              onChange={handleVehicleChange}
              required
              className="rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-4 text-white outline-none focus:border-yellow-400"
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-4 font-semibold transition-all duration-200 ${loading
              ? "bg-yellow-300 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-500 active:scale-95"
              } text-black`}
          >
            {loading ? "Registering..." : "Register as Captain"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have a captain account?{" "}
          <Link
            to="/captain-login"
            className="text-yellow-400 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

        <div className="mt-8 border-t border-zinc-800 pt-6 text-center">
          <p className="text-sm text-gray-400">
            Looking to book rides instead?
          </p>

          <Link
            to="/signup"
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-yellow-400 py-3 font-semibold text-yellow-400 transition-all duration-200 hover:bg-yellow-400 hover:text-black"
          >
            Register as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;