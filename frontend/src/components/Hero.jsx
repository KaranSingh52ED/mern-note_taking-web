import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="relative mt-16 flex min-h-screen items-center justify-center bg-darkBlue px-6 pb-0">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-90" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-4xl rounded-2xl border border-white/20 bg-white/10 p-6 text-center shadow-xl backdrop-blur-md md:p-12">
        <h1 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
          MArkNoteS
        </h1>
        <p className="mt-4 text-base text-gray-300 md:text-lg lg:text-xl">
          Welcome to MArkNoteS – where students unite for effortless
          organization, access, and sharing of PDF notes. Say goodbye to
          scattered notebooks; streamline your study routine and embark on a
          journey to academic excellence.
        </p>

        {/* Buttons - Responsive Layout */}
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {isAuthenticated ? (
            <Link
              to="/search"
              className="w-full transform rounded-lg bg-white px-6 py-3 font-semibold text-black shadow-lg transition-transform hover:scale-105 hover:bg-gray-200 sm:w-auto"
            >
              Get Started
            </Link>
          ) : (
            <>
              <Link to="/login">
                <button className="w-full transform rounded-lg bg-[#FFD700] px-6 py-3 font-semibold text-black shadow-lg transition-transform hover:scale-105 hover:bg-yellow-500 sm:w-auto">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="w-full transform rounded-lg bg-gray-800 px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-gray-700 sm:w-auto">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
