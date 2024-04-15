import axios from "axios";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { backendUrl } from "../../config";
const SearchBar = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState("");

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
  }

  const showPDF = async (files) => {
    window.open(`${backendUrl}/files/${files}`, "_blank", "noreferrer");
  };

  return (
    <div className="h-heightWithoutNavbar m-5  divide-y rounded-2xl bg-gradient-to-br from-orange-400 to-gray-100 ring-black-500 shadow-inner shadow-green-300  flex flex-col items-center justify-start p-2">
      <div className="flex w-full items-center justify-center">
        <form className="w-full max-w-[700px] border divide-y rounded-2xl bg-gradient-to-br from-red-400 to-gray-100 ring-black-500 shadow-inner shadow-blue-800 p-2" onSubmit={handleSearch}>
          <div className=" flex items-center   justify-between">
            {/* serach logo  */}
            <FaSearch className="text-2xl text-white" />
            {/* input  */} -
            <input
              type="search"
              placeholder="Seach for Notes"
              className="ml-3 w-full  rounded-2xl bg-gradient-to-br from-red-400 to-gray-100 ring-black-500 ring-1 mx-2 my-1
               shadow-inner shadow-green-400 p-2 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className=" bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {/* documents  */}
      <div className="mt-5 grid w-full grid-cols-1 gap-5 border sm:grid-cols-2 lg:grid-cols-4">
        {/* {Array(8)
          .fill(true)
          .map((item, i) => (
            <div
              key={i}
              className="flex w-[290px] items-center justify-between rounded-lg border border-black bg-[#374151] px-4 py-2 text-white"
            >
              <p className="">
                <span className="font-bold">File Name :</span> <span>Sem8</span>
              </p>
              <button className="rounded-xl bg-blue-500 px-4 py-1 font-bold hover:bg-blue-600">
                Show File
              </button>
            </div>
          ))} */}
        {searchStatus === "Found" && searchResults.length > 0 && searchResults.map((notes) => (
          <div
            key={notes._id}
            className="flex w-full max-w-[300px] flex-wrap-reverse items-center justify-between  rounded-full bg-gradient-to-br from-red-400 to-gray-100 ring-black-500 ring-1 mx-2 my-2
            shadow-inner shadow-gray-900 p-2 "
          >
            <p className="mt-2 text-sm">
              <span className="font-bold">File name: </span>
              <span >{notes.fileName} </span>
            </p>

            <button className=" rounded-full bg-gradient-to-br from-yellow-400 to-gray-100 ring-black-500 ring-1 mx-2 my-1
            shadow-inner shadow-gray-900 p-1" onClick={() => showPDF(notes.files)}>
              Show PDF
            </button>

          </div>

        ))}

        {searchStatus === "Not-Found" && (
          <div className="mt-4 text-center text-gray-600 dark:text-gray-800">
            No Notes Found
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
