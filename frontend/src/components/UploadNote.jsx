import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { backendUrl } from "../../config";
import { useNavigate } from "react-router-dom";
import { Tiptap } from "./TipTap";
import Details from "./Details";
import { useSpring, animated } from "react-spring";
import { FaSun, FaMoon } from "react-icons/fa";

const UploadNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const user = useSelector((state) => state.user.userData);
  const userId = user._id;

  const submitFile = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);
      formData.append("file", file);
      formData.append("userId", userId);

      const result = await axios.post(`${backendUrl}/notes/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Data: ", result);
      alert("Notes Uploaded Successfully");
      navigate("/search");
    } catch (error) {
      console.log("Failed to submit file: ", error);
    }
  };

  // React Spring animation for form container
  const formAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 200, friction: 20 },
  });

  return (
    <div
      className="mt-20 flex w-full items-center justify-center p-4"
      style={{ paddingTop: "80px", paddingBottom: "80px" }} // Add padding for navbar and footer
    >
      <animated.form
        style={formAnimation}
        onSubmit={submitFile}
        className={`w-full max-w-2xl rounded-lg p-4 shadow-2xl transition-all duration-300 ${
          isDarkMode
            ? "border border-gray-700 bg-gray-800"
            : "border border-gray-200 bg-white"
        }`}
      >
        {/* Dark Mode Toggle */}
        <button
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`absolute right-4 top-4 rounded-full p-2 transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-700 text-yellow-400"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>

        <h1
          className={`mb-4 text-center text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Upload Your Notes
        </h1>

        {/* Title Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            required
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full rounded-lg border p-3 ${
              isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-gray-50 text-gray-900"
            } transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <Tiptap
            placeholder="Description"
            required
            setDescription={setDescription}
            className={`w-full rounded-lg border ${
              isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-gray-50 text-gray-900"
            } transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        {/* Tags Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tags"
            required
            onChange={(e) => setTags(e.target.value)}
            className={`w-full rounded-lg border p-3 ${
              isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-gray-50 text-gray-900"
            } transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label
            htmlFor="dropzone-file"
            className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all duration-300 ${
              isDarkMode
                ? "border-gray-600 bg-gray-700 hover:bg-gray-600"
                : "border-gray-300 bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className={`mb-4 h-8 w-8 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
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
              <p
                className={`mb-2 text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p
                className={`text-xs ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                PDF only
              </p>
            </div>
            <input
              type="file"
              placeholder="File"
              accept="application/pdf"
              required
              id="dropzone-file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full rounded-lg p-3 font-semibold transition-all duration-300 ${
            isDarkMode
              ? "bg-darkBlue text-white hover:bg-blue-700"
              : "bg-darkBlue text-white hover:bg-blue-600"
          } shadow-lg hover:scale-105 hover:shadow-blue-500/30`}
        >
          Submit
        </button>
      </animated.form>
    </div>
  );
};

export default UploadNote;
