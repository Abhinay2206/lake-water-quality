import React, { useEffect, useState } from "react";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../components/DarkModeContext";
import { TbArrowBackUpDouble } from "react-icons/tb";

const Profile = () => {
  const [user, setUser] = useState({});
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); 
    }
  }, []);

  const handleBackToPageLayout = () => {
    navigate("/page-layout", { state: { username: user.username } });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        darkMode
          ? "bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200"
          : "bg-gradient-to-br from-blue-50 to-blue-200 text-gray-800"
      } flex items-center justify-center py-16 px-6 sm:px-8 lg:px-10`}
    >
      <div
        className={`max-w-xl w-full shadow-xl rounded-lg overflow-hidden ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={handleBackToPageLayout} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          >
            <TbArrowBackUpDouble className="text-xl" />
          </button>
        </div>

        <div
          className={`flex items-center justify-center py-8 ${
            darkMode
              ? "bg-gradient-to-r from-blue-800 to-indigo-700"
              : "bg-gradient-to-r from-blue-500 to-indigo-600"
          }`}
        >
          <h1 className="text-white text-4xl font-semibold">User Profile</h1>
        </div>
        <div className="p-8 space-y-6">
          <div className="flex items-center space-x-4">
            <AiOutlineUser
              className={`text-${darkMode ? "blue-400" : "blue-600"} text-4xl`}
            />
            <div>
              <p className="text-lg font-semibold">Username</p>
              <p
                className={`text-${
                  darkMode ? "gray-300" : "gray-800"
                } text-lg`}
              >
                {user.username || "Not Available"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <AiOutlineMail
              className={`text-${darkMode ? "blue-400" : "blue-600"} text-4xl`}
            />
            <div>
              <p className="text-lg font-semibold">Email or Mobile</p>
              <p
                className={`text-${
                  darkMode ? "gray-300" : "gray-800"
                } text-lg`}
              >
                {user.emailOrMobile || "Not Available"}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate("/change-password")}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
