import axios from "axios";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { backendUrl } from "../../config";
import { Link } from "react-router-dom";
import { MdScreenShare } from "react-icons/md";
import { useSpring, animated } from "react-spring";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState("");
  const [descriptionPopup, setDescriptionPopup] = useState({
    isOpen: false,
    description: "",
  });

  const user = useSelector((state) => state.user.userData);
  const username = user.userName;

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const notes = await axios.get(`${backendUrl}/notes/getFiles`, {
        params: { title: searchQuery },
      });
      if (notes.data.data.length > 0) {
        setSearchResults(notes.data.data);
        setSearchStatus("Found");
      } else {
        setSearchResults([]);
        setSearchStatus("Not-Found");
      }
    } catch (error) {
      console.log("Error Fetching Notes: ", error);
    }
  };

  const showPDF = (files) => {
    window.open(`${backendUrl}/files/${files}`, "_blank", "noreferrer");
  };

  const toggleDescriptionPopup = (description) => {
    setDescriptionPopup({ isOpen: !descriptionPopup.isOpen, description });
  };

  const fadeIn = useSpring({
    opacity: 1,
    transform: "translateY(0px) scale(1)",
    from: { opacity: 0, transform: "translateY(20px) scale(0.95)" },
  });

  return (
    <animated.div
      style={fadeIn}
      className="m-5 mt-24 flex flex-col items-center justify-start rounded-xl bg-white p-4 shadow-2xl ring-1 ring-gray-300"
    >
      <div className="w-full max-w-xl">
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-3 rounded-full border-y-2 border-yellow-500 bg-gray-100 p-3 shadow-lg transition-all hover:border-y-4 hover:shadow-2xl"
        >
          <FaSearch className="text-2xl text-darkBlue" />
          <input
            type="search"
            placeholder="Search for Notes"
            className="flex-1 bg-transparent p-2 text-gray-700 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="transform rounded-full bg-darkBlue px-5 py-2 text-white shadow-md transition-all hover:scale-105 hover:bg-blue-800"
          >
            Search
          </button>
        </form>
      </div>
      <div className="mt-6 grid w-full max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {searchStatus === "Found" &&
          searchResults.length > 0 &&
          searchResults.map((notes) => (
            <animated.div
              style={fadeIn}
              key={notes._id}
              className="transform rounded-lg bg-gray-100 p-5 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <Link to="#">
                <p className="font-semibold text-darkBlue">{notes.fileName}</p>
              </Link>
              <button
                className="mt-3 transform rounded bg-yellow-500 px-5 py-2 text-white shadow-md transition-all hover:scale-105 hover:bg-yellow-600"
                onClick={() => showPDF(notes.files)}
              >
                Show PDF
              </button>
              <MdScreenShare
                className="mt-3 transform cursor-pointer text-2xl text-darkBlue transition-all hover:scale-110 hover:text-blue-800"
                onClick={() => toggleDescriptionPopup(notes.fileDescription)}
              />
            </animated.div>
          ))}
        {searchStatus === "Not-Found" && (
          <div className="col-span-full text-center text-gray-500">
            No Notes Found
          </div>
        )}
      </div>
      {descriptionPopup.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <animated.div
            style={fadeIn}
            className="max-w-md rounded-lg bg-white p-6 shadow-xl"
          >
            <h2 className="mb-4 text-lg font-semibold text-darkBlue">
              File Description
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: descriptionPopup.description }}
            />
            <button
              className="mt-4 transform rounded bg-red-500 px-5 py-2 text-white shadow-md transition-all hover:scale-105 hover:bg-red-600"
              onClick={() => toggleDescriptionPopup("")}
            >
              Close
            </button>
          </animated.div>
        </div>
      )}
    </animated.div>
  );
};

export default SearchBar;
