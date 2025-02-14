import axios from "axios";
import React, { useState } from "react";
import { setUserData } from "../Redux/slices/user-slice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../../config";
import "./../index.css";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const user = { userEmail, userPassword };
      const result = await axios.post(`${backendUrl}/auth/login`, user);
      dispatch(setUserData(result.data));
      setTimeout(() => {
        alert("User Logged in Successfully");
        navigate("/");
      }, 500);
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="-mb-20 flex h-screen items-center justify-center bg-gradient-to-br from-gray-700 via-gray-900 to-gray-800 p-5 text-white">
      <form
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl"
        onSubmit={loginUser}
      >
        {/* Floating Decorative Elements */}
        <div className="absolute -right-[20px] -top-[20px] h-[80px] w-[80px] animate-float rounded-full bg-gradient-to-br from-darkBlue to-purple-600 opacity-[0.5] blur-xl"></div>
        <div className="absolute -bottom-[20px] -left-[20px] h-[80px] w-[80px] animate-float-reverse rounded-full bg-gradient-to-br from-pink-600 to-red-600 opacity-[0.5] blur-xl"></div>

        {/* Header */}
        <h1 className="mb-8 text-center text-4xl font-extrabold tracking-wide text-darkBlue">
          Welcome Back
        </h1>
        <p className="mb-6 text-center text-gray-500">
          Please log in to continue to{" "}
          <span className="font-semibold text-darkBlue">MarkNotes</span>.
        </p>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 rounded-lg border border-red-300 bg-red-100 p-3 text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        {/* Input Fields */}
        <div className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="userEmail"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-800 placeholder-gray-400 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-darkBlue"
              placeholder="your.email@example.com"
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="userPassword"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-800 placeholder-gray-400 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-darkBlue"
              placeholder="*********"
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full rounded-lg py-3 font-semibold transition-all duration-300 ${
            loading
              ? "cursor-not-allowed bg-darkBlue/50"
              : "transform bg-darkBlue text-white hover:scale-[1.02] hover:bg-darkBlue/90"
          } shadow-lg hover:shadow-darkBlue/30`}
        >
          {loading ? "Logging In..." : "Log In"}
        </button>

        {/* Additional Links */}
        <div className="mt-6 flex items-center justify-between text-sm">
          <Link
            to="/forgot-password"
            className="text-gray-500 transition-all duration-200 hover:text-darkBlue"
          >
            Forgot Password?
          </Link>
          <Link
            to="/signup"
            className="font-semibold text-darkBlue transition-all duration-200 hover:underline"
          >
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
