import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);


  return (
    <div className="bg-unsplashBgImage relative flex h-full items-center divide-y rounded-xs  ring-2 ring-black-500 shadow-2xl shadow-green-300 m-5  justify-center bg-cover bg-center">
      <div className="absolute inset-0 bg-black bg-opacity-70" />
      <div className="relative z-10 w-full max-w-[860px] text-center text-white">
        <h1 className="text-4xl font-black md:text-5xl">MArkNoteS</h1>
        <p className="mt-5 text-sm font-light md:text-xl md:font-normal">
          Welcome to MArkNoteS – where students unite for effortless
          organization, access, and sharing of PDF notes. Say goodbye to
          scattered notebooks; streamline your study routine and embark on a
          journey to academic excellence. Simplify your student life, make your
          notes work for you – discover a new era of innovation, start today
        </p>
        <div className="mt-5">
          {/* <Link to="/search">
            <button className="rounded-xl divide-y rounded-xs  ring-2 ring-black-500 shadow-xl shadow-green-300 bg-gradient-to-br from-red-400 to-gray-100 bg-white px-7 py-4 font-black my-2 text-blue-500 ">
              Get Started
            </button>
          </Link> */}
          <div
            className="flex items-center justify-center gap-5
          "
          >
            {isAuthenticated ? (
              <Link to="/search" className="rounded-xl bg-white px-7 my-2 divide-y rounded-xs  ring-2 bg-gradient-to-br from-red-400 to-gray-100 ring-black-500 shadow-xl shadow-green-300 py-4 font-black text-blue-500">Get Started</Link>
            ) : (
              <>
                <Link to="/login">
                  <button className="rounded-xl bg-white px-7 my-2 divide-y rounded-xs  ring-2 bg-gradient-to-br from-red-400 to-gray-100 ring-black-500 shadow-xl shadow-green-300 py-4 font-black text-blue-500 ">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="rounded-xl bg-white px-7 py-4 divide-y rounded-xs  ring-2 my-2 ring-black-500 shadow-xl bg-gradient-to-br from-red-400 to-gray-100 shadow-green-300 font-black text-blue-500 ">
                    Signup
                  </button>
                </Link>

              </>
            )}

          </div>
        </div >
      </div >
    </div >
  );
};

export default Hero;
