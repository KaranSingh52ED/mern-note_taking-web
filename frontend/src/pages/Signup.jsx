import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../config";
import "./../index.css";
const Signup = () => {
  const navigate = useNavigate();
  const [profilePreviewImage, setProfilePreviewImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const registerUser = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      setErrorMessage("");

      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("userBio", userBio);
      formData.append("userEmail", userEmail);
      formData.append("userMobile", userMobile);
      formData.append("userName", userName);
      formData.append("userPassword", userPassword);
      formData.append("profileImage", profileImage);

      const result = await axios.post(`${backendUrl}/auth/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Data: ", result);
      alert("Signup Successful! Please Login to Continue.");
      navigate("/login");
    } catch (error) {
      setErrorMessage("Failed to register user. Please try again.");
      console.log("Failed to Register User: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-700 via-gray-900 to-gray-800 p-8 text-white">
      <form
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl"
        onSubmit={registerUser}
      >
        {/* Floating Decorative Elements */}
        <div className="absolute -right-[20px] -top-[20px] h-[80px] w-[80px] animate-float rounded-full bg-gradient-to-br from-darkBlue to-purple-600 opacity-[0.5] blur-xl"></div>
        <div className="absolute -bottom-[20px] -left-[20px] h-[80px] w-[80px] animate-float-reverse rounded-full bg-gradient-to-br from-pink-600 to-red-600 opacity-[0.5] blur-xl"></div>

        {/* Header */}
        <h1 className="mb-8 text-center text-4xl font-extrabold tracking-wide text-darkBlue">
          Create an Account
        </h1>
        <p className="mb-6 text-center text-gray-500">
          Join <span className="font-semibold text-darkBlue">MarkNotes</span> to
          start your journey.
        </p>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 rounded-lg border border-red-300 bg-red-100 p-3 text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        {/* Input Fields */}
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-800 placeholder-gray-400 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-darkBlue"
                placeholder="John"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-800 placeholder-gray-400 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-darkBlue"
                placeholder="Doe"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="userBio"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Bio
            </label>
            <textarea
              id="userBio"
              name="userBio"
              rows="3"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-800 placeholder-gray-400 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-darkBlue"
              placeholder="Tell us something about yourself"
              onChange={(e) => setUserBio(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="userEmail"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Email
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
              htmlFor="userMobile"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Mobile Number
            </label>
            <input
              type="number"
              id="userMobile"
              name="userMobile"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-800 placeholder-gray-400 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-darkBlue"
              placeholder="0000000000"
              onChange={(e) => setUserMobile(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="userName"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-800 placeholder-gray-400 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-darkBlue"
              placeholder="johndoe123"
              onChange={(e) => setUserName(e.target.value)}
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
          <div>
            <label
              htmlFor="dropzone-file"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Profile Image
            </label>
            <div className="flex w-full items-center justify-center">
              <label
                htmlFor="dropzone-file"
                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
              >
                {profilePreviewImage ? (
                  <img
                    src={profilePreviewImage}
                    alt="Profile Preview"
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG only</p>
                  </div>
                )}
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/png"
                  onChange={(e) => {
                    setProfilePreviewImage(
                      URL.createObjectURL(e.target.files[0]),
                    );
                    setProfileImage(e.target.files[0]);
                  }}
                  required
                />
              </label>
            </div>
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
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Additional Links */}
        <div className="mt-6 flex items-center justify-center text-sm">
          <span className="text-gray-500">Already have an account?</span>
          <Link
            to="/login"
            className="ml-2 font-semibold text-darkBlue transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
