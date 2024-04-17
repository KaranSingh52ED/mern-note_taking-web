import axios from "axios";
import React, { useState } from "react";
import { setUserData } from "../Redux/slices/user-slice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../../config";
const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const loginUser = async (e) => {
    try {
      e.preventDefault();

      const user = {
        userEmail,
        userPassword,
      };

      const result = await axios.post(`${backendUrl}/auth/login`, user);
      console.log("User Logged in Successfully: ", result);

      dispatch(setUserData(result.data));
      setTimeout(() => {
        alert("User Logged in Successfully");
        navigate("/");
      }, 500);


    } catch (error) {
      console.log("Cannot Login the User: ", error);
    }
  };

  return (
    <div className="h-heightWithoutNavbar divide-y rounded-lg m-5 ring-2 ring-red-500 shadow-2xl bg-gradient-to-br from-red-400 to-gray-100  shadow-blue-500  flex w-full items-center justify-center p-5">
      <form className="flex w-full divide-y m-5 ring-2 ring-green-500 shadow-2xl bg-gradient-to-br from-orange-400 to-gray-100  shadow-blue-500  max-w-[420px] flex-col gap-4 rounded-xl bg-white p-5 " onSubmit={loginUser}>
        <h1 className="text-2xl font-bold">Login</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start justify-center">
            <label className="font-bold" htmlFor="userEmail">Email</label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              className="w-full rounded-lg border border-gray-400 p-2 focus:ring focus:ring-blue-500"
              placeholder="your.email@example.com"
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label className="font-bold" htmlFor="userPassword">Password</label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              className="w-full rounded-lg border border-gray-400 p-2 focus:ring focus:ring-blue-500"
              placeholder="*********"
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="rounded-lg bg-blue-500 px-5 py-2 font-bold text-white hover:bg-blue-600" type="submit">
          Log In
        </button>
        <div className="flex items-center justify-between text-sm">
          <p className="">New to MArkNoteS?</p>
          <Link to="/signup">
            <p className="font-bold">Create an account</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
