import axios from "axios";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { backendUrl } from "../../config";
import { Link } from "react-router-dom";
import { MdScreenShare } from "react-icons/md";

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
        params: {
          title: searchQuery,
        },
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

  const showPDF = async (files) => {
    window.open(`${backendUrl}/files/${files}`, "_blank", "noreferrer");
  };

  const toggleDescriptionPopup = (description) => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(description, "text/html");
    const descriptionString = htmlDoc.body.textContent;
    setDescriptionPopup({
      isOpen: !descriptionPopup.isOpen,
      description: descriptionString,
    });
  };

  return (
    <div className="h-heightWithoutNavbar m-5  divide-y rounded-2xl bg-gradient-to-br from-orange-400 to-gray-100 ring-black-500 shadow-inner shadow-green-300  flex flex-col items-center justify-start p-2">
      <div className="flex w-full items-center justify-center">
        <form
          className="w-full max-w-[700px] border divide-y rounded-2xl bg-gradient-to-br from-red-400 to-gray-100 ring-black-500 shadow-inner shadow-blue-800 p-2"
          onSubmit={handleSearch}
        >
          <div className="flex items-center justify-between">
            {/* Search logo */}
            <FaSearch className="text-2xl text-white" />
            {/* Input */}
            <input
              type="search"
              placeholder="Search for Notes"
              className="ml-3 w-full rounded-2xl bg-gradient-to-br from-red-400 to-gray-100 ring-black-500 ring-1 mx-2 my-1 shadow-inner shadow-green-400 p-2 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {/* Documents */}
      <div className="mt-5 grid w-full grid-cols-1 gap-5 border sm:grid-cols-2 lg:grid-cols-4">
        {searchStatus === "Found" &&
          searchResults.length > 0 &&
          searchResults.map((notes) => (
            <div
              key={notes._id}
              className="flex w-full max-w-[300px] flex-wrap-reverse items-center justify-between rounded-full bg-gradient-to-br from-red-400 to-gray-100 ring-black-500 ring-1 mx-2 my-2 shadow-inner shadow-gray-900 p-2"
            >
              <Link>
                <p className="mt-2 text-sm">
                  <span className="font-bold">Title:</span>{" "}
                  <span>{notes.fileName}</span>
                </p>
              </Link>
              <button
                className="rounded-full bg-gradient-to-br from-yellow-400 to-gray-100 ring-black-500 ring-1 mx-2 my-1 shadow-inner shadow-gray-900 p-1"
                onClick={() => showPDF(notes.files)}
              >
                Show PDF
              </button>
              <MdScreenShare
                className="rounded-full h-8 w-8 bg-gradient-to-br from-yellow-400 to-gray-100 ring-black-500 ring-1 mx-2 my-1 shadow-inner shadow-gray-900 p-1"
                onClick={() => toggleDescriptionPopup(notes.fileDescription)}
              />
            </div>
          ))}
        {searchStatus === "Not-Found" && (
          <div className="mt-4 text-center text-gray-600 dark:text-gray-800">
            No Notes Found
          </div>
        )}
      </div>
      {/* Description Popup */}
      {descriptionPopup.isOpen && (
        <div className="fixed inset-0 flex rounded-full w-screen items-center bg-gradient-to-br from-yellow-400 to-gray-100 ring-black-500 ring-1 mx-4 my-1 shadow-inner shadow-gray-900 justify-center z-50 bg-opacity-50">
          <div className="bg-white p-8 max-w-[750px] bg-gradient-to-br from-orange-400 to-gray-100 ring-black-500 shadow-green-300 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">File Description</h2>
            <p>{descriptionPopup.description}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => toggleDescriptionPopup("")} // Close Popup
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
