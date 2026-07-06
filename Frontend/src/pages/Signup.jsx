import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import name from "../assets/name.png";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        form
      );

      if (res.data.success) {
        toast.success("OTP sent to your email 📩");

        localStorage.setItem("otpEmail", form.email);
        localStorage.setItem("otpRole", "user");

        navigate("/otp-verify", {
          state: {
            email: form.email,
            role: "user",
          },
        });
        window.scrollTo({ top: 0, behavior: 'smooth' })

      }
    } catch (error) {
      console.log(error);

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
    <div className="min-h-screen bg-black relative flex items-center justify-center px-5 py-10">

      <div className="absolute top-[-5px] left-6">
        <img src={name} alt="Factory" className="w-32 sm:w-40 md:w-48 object-contain" />
      </div>

      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-yellow-400">
            Create Account
          </h1>
          <p className="text-gray-400 mt-2">
            Create your account to get started.
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
            className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-4 text-white"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-4 text-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-4 text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-4 font-semibold ${loading ? "bg-yellow-300" : "bg-yellow-400 hover:bg-yellow-500"
              } text-black`}
          >
            {loading ? "Sending OTP..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400">
            Login
          </Link>
        </p>
        <div className="mt-8 border-t border-zinc-800 pt-6 text-center">
          <p className="text-sm text-gray-400">
            Want to earn by driving with Factory?
          </p>

          <Link
            to="/captainsignup"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-3 inline-flex items-center justify-center w-full rounded-xl border border-yellow-400 text-yellow-400 py-3 font-semibold transition-all duration-200 hover:bg-yellow-400 hover:text-black"
          >
            Register as a Captain
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Signup;