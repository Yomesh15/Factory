import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import name from "../assets/name.png"
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
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
        `${import.meta.env.VITE_API_URL}/user/login`,
        form,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Login Successful 🎉");

        localStorage.setItem("userToken", res.data.token)

        navigate("/userhome");
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
    <div className="min-h-screen bg-black relative flex items-center justify-center px-5">

      <div className="absolute top-6 left-6">
        <img
          src={name}
          alt="Factory"
          className="w-32 sm:w-40 md:w-48 object-contain"
        />
      </div>

      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-yellow-400">
            Welcome Back
          </h1>

          <p className="text-gray-400 mt-2">
            Login to continue to Factory
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm text-white mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-4 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-4 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-4 text-lg font-semibold transition-all duration-200 ${loading
              ? "bg-yellow-300 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-500 active:scale-95"
              } text-black`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-7 text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-yellow-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        <div className="mt-8 border-t border-zinc-800 pt-6 text-center">
          <p className="text-sm text-gray-400">
            Driving with Factory? Access your captain dashboard.
          </p>

          <Link
            to="/captainlogin"
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-yellow-400 py-3 font-semibold text-yellow-400 transition-all duration-200 hover:bg-yellow-400 hover:text-black"
          >
            Login as a Captain
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;