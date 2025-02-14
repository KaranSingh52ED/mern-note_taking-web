import React from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import "./../index.css";
const NotFound = () => {
  // Animation for the 404 text
  const fadeIn = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 200, friction: 20 },
  });

  // Animation for the button
  const buttonAnimation = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.8)" },
    delay: 500,
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-700 via-gray-900 to-gray-800 p-5 text-white">
      <div className="text-center">
        {/* Floating Decorative Elements */}
        <div className="absolute -right-[20px] -top-[20px] h-[80px] w-[80px] animate-float rounded-full bg-gradient-to-br from-darkBlue to-purple-600 opacity-[0.5] blur-xl"></div>
        <div className="absolute -bottom-[20px] -left-[20px] h-[80px] w-[80px] animate-float-reverse rounded-full bg-gradient-to-br from-pink-600 to-red-600 opacity-[0.5] blur-xl"></div>

        {/* 404 Text */}
        <animated.div style={fadeIn} className="space-y-4">
          <h1 className="text-9xl font-extrabold text-darkBlue">404</h1>
          <h2 className="text-4xl font-bold text-gray-200">Page Not Found</h2>
          <p className="text-lg text-gray-400">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </animated.div>

        {/* Back to Home Button */}
        <animated.div style={buttonAnimation} className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center rounded-lg bg-darkBlue px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-darkBlue/90 hover:shadow-darkBlue/30"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            Go Back Home
          </Link>
        </animated.div>

        {/* Additional Decorative Elements */}
        <div className="animate-float-slow absolute -left-[100px] -top-[100px] h-[200px] w-[200px] rounded-full bg-gradient-to-br from-darkBlue to-purple-600 opacity-[0.2] blur-3xl"></div>
        <div className="animate-float-reverse-slow absolute -bottom-[100px] -right-[100px] h-[200px] w-[200px] rounded-full bg-gradient-to-br from-pink-600 to-red-600 opacity-[0.2] blur-3xl"></div>
      </div>
    </div>
  );
};

export default NotFound;
