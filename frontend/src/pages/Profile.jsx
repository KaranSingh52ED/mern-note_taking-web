import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaExternalLinkAlt } from "react-icons/fa";
import { backendUrl } from "../../config";
import { ClipLoader } from "react-spinners";

const Profile = () => {
  const user = useSelector((state) => state.user.userData);
  const [userFiles, setUserFiles] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading spinner
  const userId = user?._id;

  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(
          `${backendUrl}/notes/getFiles/${userId}`,
        );
        setUserFiles(response.data.data || []);
      } catch (error) {
        console.error("Error fetching user files:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (userId) fetchUserFiles();
  }, [userId]);

  const numberOfUploads = userFiles.length;

  return (
    <div className="mt-16 flex flex-col items-center justify-center gap-8 bg-darkBlue bg-opacity-15 px-6 py-10 lg:flex-row lg:py-16">
      {/* Profile Section */}
      <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white p-8 shadow-lg lg:w-2/5">
        {/* Profile Image */}
        <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gray-300 shadow-md">
          <img
            src={user?.profileImage || "/default-profile.png"}
            alt="User Profile"
            className="h-full w-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="mt-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-gray-600">@{user?.userName}</p>
          <p className="mt-3 text-sm text-gray-500">
            {user?.userBio || "This user has not added a bio yet."}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8 flex w-full items-center justify-around border-t border-gray-200 pt-4">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Uploads</p>
            <p className="text-xl font-bold text-indigo-600">
              {numberOfUploads}
            </p>
          </div>
          <div className="h-12 w-px bg-gray-300"></div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Total Files</p>
            <p className="text-xl font-bold text-indigo-600">
              {numberOfUploads}
            </p>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="w-full rounded-lg bg-white p-8 shadow-lg lg:w-3/5">
        <h3 className="mb-6 text-xl font-bold text-gray-800">My Documents</h3>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex h-[200px] items-center justify-center">
            <ClipLoader color="#6366F1" size={50} />
          </div>
        ) : userFiles.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {userFiles.map((file) => (
              <a
                key={file._id}
                href={`${backendUrl}/files/${file.files}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-shadow hover:border-indigo-500 hover:shadow-md"
              >
                <span className="truncate text-gray-700">{file.fileName}</span>
                <FaExternalLinkAlt size={16} color="#6366F1" />
              </a>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No documents uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
