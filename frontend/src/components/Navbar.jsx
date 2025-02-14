import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData } from "../Redux/slices/user-slice";
import { useSpring, animated } from "react-spring";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handleLogout = () => {
    console.log("Logging out...");
    dispatch(removeUserData());
    localStorage.removeItem("userData");
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  const menuAnimation = useSpring({
    transform: isMenuOpen ? "translateY(0%)" : "translateY(-100%)",
    opacity: isMenuOpen ? 1 : 0,
    config: { tension: 200, friction: 20 },
  });

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-300 bg-white font-medium text-black shadow-lg transition-all duration-500">
      <animated.div className="container mx-auto flex transform items-center justify-between px-6 py-4 transition-all duration-500 hover:scale-95">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-darkBlue transition-all duration-300 hover:text-gray-600"
        >
          <img
            src="/logo.jpg"
            alt="Logo"
            className="animate-pulse h-10 w-10 rounded-full"
          />
          <span>MarkNotes</span>
        </Link>

        <nav className="hidden items-center gap-6 text-lg md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transform rounded-md px-4 py-2 transition-all duration-300 hover:scale-110 ${
                location.pathname === link.path
                  ? "bg-darkBlue text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {isAuthenticated ? (
            <>
              <FaSearch
                onClick={() => navigate("/search")}
                className="transform cursor-pointer text-xl transition-all duration-300 hover:scale-125 hover:text-darkBlue"
              />
              <MdOutlineFileUpload
                onClick={() => navigate("/upload")}
                className="transform cursor-pointer text-xl transition-all duration-300 hover:scale-125 hover:text-darkBlue"
              />
              <button
                onClick={() => navigate("/profile")}
                className="transform rounded-md bg-darkBlue px-4 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-gray-300 hover:text-black"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="transform rounded-md bg-red-500 px-4 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="transform rounded-md bg-darkBlue px-4 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-gray-300 hover:text-black">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="transform rounded-md border border-darkBlue px-4 py-2 text-darkBlue transition-all duration-300 hover:scale-105 hover:bg-darkBlue hover:text-white">
                  Signup
                </button>
              </Link>
            </>
          )}
        </nav>

        <GiHamburgerMenu
          className="transform cursor-pointer text-2xl text-darkBlue transition-all duration-300 hover:scale-125 hover:text-gray-600 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </animated.div>

      {isMenuOpen && (
        <animated.div
          style={menuAnimation}
          className="absolute left-0 top-[80px] z-40 w-full rounded-b-lg bg-white p-4 shadow-lg transition-all duration-300 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="block transform rounded-md px-4 py-2 text-gray-600 transition-all duration-300 hover:scale-110 hover:text-black"
            >
              {link.name}
            </Link>
          ))}

          {isAuthenticated ? (
            <>
              {/* Search Button */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/search"); // Navigate to search
                }}
                className="mt-2 flex w-full transform items-center justify-center gap-2 rounded-md bg-darkBlue px-4 py-2 text-white transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800"
              >
                <FaSearch className="text-xl" />
                <span>Search</span>
              </button>

              {/* Upload Button */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/upload"); // Navigate to upload
                }}
                className="mt-2 flex w-full transform items-center justify-center gap-2 rounded-md bg-darkBlue px-4 py-2 text-white transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800"
              >
                <MdOutlineFileUpload className="text-xl" />
                <span>Upload</span>
              </button>

              {/* Profile Button */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/profile"); // Navigate to profile
                }}
                className="mt-2 w-full transform rounded-md bg-darkBlue px-4 py-2 text-white transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800"
              >
                Profile
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="mt-2 w-full transform rounded-md bg-red-500 px-4 py-2 text-white transition-all duration-300 hover:scale-[1.02] hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-[8px] w-full rounded-md border border-darkBlue px-[16px] py-[8px] text-darkBlue transition-all duration-[750ms] hover:bg-darkBlue  hover:text-white"
                >
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-[8px] w-full rounded-md border border-darkBlue px-[16px] py-[8px] text-darkBlue transition-all duration-[750ms] hover:bg-darkBlue  hover:text-white"
                >
                  Signup
                </button>
              </Link>
            </>
          )}
        </animated.div>
      )}
    </header>
  );
};

export default Navbar;
