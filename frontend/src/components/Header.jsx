import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData, setUserData } from "../Redux/slices/user-slice";

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userData);

  const handleLogout = () => {
    dispatch(removeUserData());
    navigate("/");
  }

  return (
    <header className="flex h-[80px] items-center justify-center divide-y rounded-lg  ring-2 ring-red-500 shadow-inner bg-gradient-to-br from-orange-400 to-gray-100  shadow-emerald-300 ">
      <div className="mx-5 flex w-full max-w-[1550px] items-center justify-between">
        {/* image section */}
        <div className="flex h-[60px] w-[60px] items-center  justify-center rounded-full overflow-hidden">
          <img src="/logo.jpg" alt="Logo" />
        </div>
        {/* title */}
        <Link to="/" className="text-2xl font-serif text-red-500">
          <b> MArkNoteS</b>
        </Link>

        {/* nav links  */}
        <GiHamburgerMenu className="text-xl md:hidden" />
        <div className="hidden md:flex text-black md:items-center  md:justify-center md:gap-4">
          <Link to="/">
            Home
          </Link>
          <Link to="/about">
            About
          </Link>

          {/* Conditional Rendering */}
          {isAuthenticated ? (
            <>
              <Link to="/search">
                <FaSearch className="text-xl" />
              </Link>
              <Link to="/upload">
                <MdOutlineFileUpload className="text-[24px]" />
              </Link>
              <Link to="/profile">
                <button className="rounded-xl bg-green-500 px-5 py-2 font-semibold hover:bg-red-300">
                  Profile
                </button>
              </Link>
              <button className="rounded-xl bg-green-500 px-5 py-2 font-semibold hover:bg-red-300" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>

              <Link to="/login">
                <button className="rounded-xl bg-green-500 px-5 py-2 font-semibold hover:bg-red-300">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-red-300">
                  Signup
                </button>
              </Link>
            </>

          )}

        </div>
      </div>
    </header>
  );
};

export default Navbar;
