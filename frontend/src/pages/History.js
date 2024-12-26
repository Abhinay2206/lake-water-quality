import React, { useState, useEffect } from "react";
import { useDarkMode } from "../components/DarkModeContext";
import { TbArrowBackUpDouble } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [history, setHistory] = useState([]);
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.username) {
      const userHistory = JSON.parse(localStorage.getItem(storedUser.username)) || [];
      setHistory(userHistory);
    }
  }, []);

  const handleBackToPageLayout = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    navigate("/page-layout", { state: { username: storedUser?.username || "" } });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        darkMode
          ? "bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200"
          : "bg-gradient-to-br from-blue-50 to-blue-200 text-gray-800"
      } flex flex-col items-center`}
    >
      <div className="relative w-full max-w-6xl">
        <button
          onClick={handleBackToPageLayout}
          className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          <TbArrowBackUpDouble className="text-xl" />
        </button>
      </div>

      <div className="w-full max-w-6xl py-16 px-6">
        <h1 className="text-center text-4xl font-bold mb-8">History</h1>
        {history.length > 0 ? (
          <div className="flex flex-col items-center space-y-6">
            {history.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-6 p-6 rounded-lg shadow-md w-full max-w-2xl ${
                  darkMode
                    ? "bg-gray-800 text-gray-200"
                    : "bg-white text-gray-800"
                }`}
              >
                {item.previewUrl && (
                  <img
                    src={item.previewUrl}
                    alt="Preview"
                    className="w-36 h-36 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <p className="text-lg">
                    <strong>Lake Name:</strong> {item.lakeName}
                  </p>
                  <p className="text-sm">
                    <strong>Date:</strong> {item.timestamp}
                  </p>
                  <p className="text-lg">
                    <strong>pH Level:</strong> {item.result.pHLevel}
                  </p>
                  <p className="text-lg">
                    <strong>Status:</strong> {item.result.status}
                  </p>
                  <p className="text-lg">
                    <strong>Confidence:</strong> {item.result.confidence}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">No history found for this user.</p>
        )}
      </div>
    </div>
  );
};

export default History;
