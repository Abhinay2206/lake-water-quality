import React, { useState, useEffect } from "react";
import { useDarkMode } from "../components/DarkModeContext";
import { TbArrowBackUpDouble } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; 
import { FiTrash2 } from "react-icons/fi";

const History = () => {
  const [history, setHistory] = useState([]);
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken"); 
    if (token) {
      const decodedToken = jwtDecode(token); 
      const storedHistory = JSON.parse(localStorage.getItem(decodedToken.email)) || []; 
      setHistory(storedHistory);
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
      localStorage.setItem(decodedToken.email, JSON.stringify(newHistory));
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
          ? "bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200"
          : "bg-gradient-to-br from-blue-50 to-blue-200 text-gray-800"
      } flex flex-col items-center`}
    >
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} max-w-sm`}>
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} max-w-sm`}>
            <h2 className="text-xl font-bold mb-4">Clear All History</h2>
            <p>Are you sure you want to clear all history? This action cannot be undone.</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmClear}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-6xl">
        <button
          onClick={handleBackToPageLayout}
          className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          <TbArrowBackUpDouble className="text-xl" />
        </button>
      </div>

      <div className="w-full max-w-6xl py-16 px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-center text-4xl font-bold">History</h1>
          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 flex items-center gap-2"
            >
              <FiTrash2 /> Clear All History
            </button>
          )}
        </div>
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
                    <strong>Result:</strong> {item.result.prediction === 0 ? "Poor" : "Good"}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteItem(index)}
                  className="p-2 text-red-500 hover:text-red-600 transition duration-200"
                >
                  <FiTrash2 size={20} />
                </button>
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
