import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import name from "../assets/name.png";

const CaptainLogin = () => {
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
        `${import.meta.env.VITE_API_URL}/captain/login`,
        form,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Welcome Captain 🚖");

        localStorage.setItem("captainToken", res.data.token)

        navigate("/captainhomepage"); 
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
    <div className="min-h-screen bg-black flex justify-center items-center px-5 py-10 relative">
 
      <div className="absolute top-6 left-6">
        <img
          src={name}
          alt="Factory"
          className="w-32 sm:w-40 md:w-48 object-contain"
        />
      </div>

      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-400">
            Captain Login
          </h1>

          <p className="text-gray-400 mt-2">
            Login to your Factory Captain account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email Address"
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

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-4 font-semibold transition-all duration-200 ${
              loading
                ? "bg-yellow-300 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500 active:scale-95"
            } text-black`}
          >
            {loading ? "Logging in..." : "Login as Captain"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have a captain account?{" "}
          <Link
            to="/captainsignup"
            className="text-yellow-400 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

        <div className="mt-8 border-t border-zinc-800 pt-6 text-center">
          <p className="text-sm text-gray-400">
            Looking to book rides instead?
          </p>

          <Link
            to="/login"
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-yellow-400 py-3 font-semibold text-yellow-400 transition-all duration-200 hover:bg-yellow-400 hover:text-black"
          >
            Login as User
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CaptainLogin;