import React, { useState, useEffect } from "react";
import { useDarkMode } from "../components/DarkModeContext";
import { TbArrowBackUpDouble } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FiTrash2, FiCalendar, FiMapPin, FiCheckCircle, FiXCircle } from "react-icons/fi";

const History = () => {
  const [history, setHistory] = useState([]);
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin) {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        const storedHistory = JSON.parse(localStorage.getItem(decodedToken.email)) || [];
        const sortedHistory = [...storedHistory].reverse();
        setHistory(sortedHistory);
      }
    }
  }, []);

  const handleDeleteItem = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const newHistory = history.filter((_, i) => i !== deleteIndex);
      localStorage.setItem(decodedToken.email, JSON.stringify([...newHistory].reverse())); // Reverse back for storage
      setHistory(newHistory);
    }
    setShowDeleteConfirm(false);
  };

  const handleClearHistory = () => {
    setShowClearConfirm(true);
  };

  const confirmClear = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      localStorage.setItem(decodedToken.email, JSON.stringify([]));
      setHistory([]);
    }
    setShowClearConfirm(false);
  };

  const handleBackToPageLayout = () => {
    const token = localStorage.getItem("jwtToken");
    const storedUser = token ? jwtDecode(token) : {};
    navigate("/page-layout", { state: { username: storedUser.username || "" } });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        darkMode
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-200"
          : "bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800"
      }`}
    >
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} max-w-sm shadow-2xl transform transition-all duration-200`}>
            <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-500">Are you sure you want to delete this item?</p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-5 py-1.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} max-w-sm shadow-2xl transform transition-all duration-200`}>
            <h2 className="text-2xl font-bold mb-4">Clear All History</h2>
            <p className="text-gray-500">Are you sure you want to clear all history? This action cannot be undone.</p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-5 py-1.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmClear}
                className="px-5 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={handleBackToPageLayout}
            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200 shadow-lg hover:shadow-xl"
          >
            <TbArrowBackUpDouble className="text-xl" />
          </button>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Analysis History
          </h1>
          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <FiTrash2 /> Clear All
            </button>
          )}
        </div>

        {history.length > 0 ? (
          <div className="flex flex-col gap-4 max-w-2xl mx-auto">
            {history.map((item, index) => (
              <div
                key={index}
                className={`rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                  darkMode
                    ? "bg-gray-800 text-gray-200"
                    : "bg-white text-gray-800"
                }`}
              >
                <div className="flex">
                  {item.previewUrl && (
                    <div className="relative w-48 h-48">
                      <img
                        src={item.previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FiMapPin className="text-blue-500" />
                        <h3 className="text-xl font-semibold">{item.lakeName}</h3>
                      </div>
                      <button
                        onClick={() => handleDeleteItem(index)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200 shadow-lg"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500">
                      <FiCalendar />
                      <span>{item.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {item.result.prediction === 1 ? (
                        <FiCheckCircle className="text-green-500" size={20} />
                      ) : (
                        <FiXCircle className="text-red-500" size={20} />
                      )}
                      <span className={`font-medium ${
                        item.result.prediction === 1 ? "text-green-500" : "text-red-500"
                      }`}>
                        {item.result.prediction === 0 ? "Poor Quality" : "Good Quality"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <FiTrash2 size={48} className="mb-4" />
            <p className="text-xl">No history found for this user.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
