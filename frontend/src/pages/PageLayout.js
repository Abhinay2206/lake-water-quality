import React, { useState, useEffect } from "react";
import { GiDroplets } from "react-icons/gi";
import { FiUser, FiLogOut, FiClock, FiHome } from "react-icons/fi"; 
import FileUpload from "../components/FileUpload";
import Input from "../components/Input";
import Results from "../components/Results";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDarkMode } from '../components/DarkModeContext';

function PageLayout() {
  const { darkMode } = useDarkMode();
  const [lakeName, setLakeName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUsername(decodedToken.email);
      }
    
    if (location.state?.history) {
      setHistory(location.state.history);
    }
    const storedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(storedHistory);
  }, [location.state]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileSize((file.size / 1024).toFixed(2) + " KB");
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setFileSize(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lakeName || !selectedFile) {
      alert("Please enter a lake name and upload an image!");
      return;
    }

    const isLogin = localStorage.getItem('isLogin');
    if (!isLogin) {
      setShowLoginPrompt(true);
      return;
    }

    try {
      const token = localStorage.getItem('jwtToken');
      const email = token ? JSON.parse(atob(token.split('.')[1])).email : "guest@example.com";

      const predictionFormData = new FormData();
      predictionFormData.append("image", selectedFile);

      const predictionResponse = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: predictionFormData
      });

      if (!predictionResponse.ok) {
        throw new Error("Failed to get prediction");
      }

      const predictionData = await predictionResponse.json();
      setResult(predictionData);
      setIsResultsOpen(true);

      const formData = new FormData();
      formData.append("name", lakeName);
      formData.append("email", email);
      formData.append("image", selectedFile);
      formData.append("result", JSON.stringify(predictionData)); // Use predictionData instead of result

      const uploadResponse = await fetch("http://localhost:5010/api/image/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const timestamp = new Date().toLocaleString();
      const newHistoryItem = { 
        lakeName, 
        timestamp, 
        result: predictionData,
        file: selectedFile.name, 
        previewUrl: previewUrl || "" 
      };

      const currentUserHistory = JSON.parse(localStorage.getItem(username)) || [];
      const updatedHistory = [...currentUserHistory, newHistoryItem];

      localStorage.setItem(username, JSON.stringify(updatedHistory));
      setHistory(updatedHistory);

    } catch (error) {
      alert(error.message);
    }
  };

  const handleContinueWithoutLogin = async () => {
    setShowLoginPrompt(false);
    try {
      const predictionFormData = new FormData();
      predictionFormData.append("image", selectedFile);

      const predictionResponse = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: predictionFormData
      });

      if (!predictionResponse.ok) {
        throw new Error("Failed to get prediction");
      }

      const predictionData = await predictionResponse.json();
      setResult(predictionData);
      setIsResultsOpen(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigateTo = (path) => {
    navigate(path, { state: { username, history } });
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    setUsername("");
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('isLogin')
    navigate('/login');
    setDropdownOpen(false);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        darkMode ? "bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200" : "bg-gradient-to-br from-blue-50 to-blue-200 text-gray-800"
      }`}
    >
      <div className="relative">
        <button
          className={`fixed top-4 left-20 text-lg flex items-center gap-2
                    ${darkMode ? "text-gray-200 hover:text-blue-400" : "text-gray-800 hover:text-blue-600"}
                    border ${darkMode ? "border-gray-600" : "border-gray-300"}
                    bg-transparent rounded-full px-6 py-2 transition duration-300
                    hover:bg-opacity-10 hover:border-blue-500 hover:shadow-lg`}
          onClick={() => navigate('/')}
        >
          <FiHome className="text-xl" />
        </button>

        {username ? (
          <>
            <button
              className={`fixed top-4 right-20 text-lg flex items-center gap-2 
                        ${darkMode ? "text-gray-200 hover:text-blue-400" : "text-gray-800 hover:text-blue-600"} 
                        border ${darkMode ? "border-gray-600" : "border-gray-300"} 
                        bg-transparent rounded-full px-6 py-2 transition duration-300 
                        hover:bg-opacity-10 hover:border-blue-500 hover:shadow-lg`}
              onClick={toggleDropdown}
            >
              <FiUser className="text-xl" />
              {username.split('@')[0]} 
            </button>
            {dropdownOpen && (
              <div className={`absolute right-5 mt-16 w-56 rounded-xl shadow-2xl z-10 backdrop-blur-md 
                            ${darkMode ? "bg-gray-800/90 text-gray-200" : "bg-white/90 text-gray-800"} 
                            border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <FiUser className="text-xl text-blue-500" />
                    <div>
                      <p className="font-medium">{username}</p>
                      <p className="text-sm text-gray-500">User Account</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button 
                    onClick={() => navigateTo('/profile')} 
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition duration-200
                              ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  >
                    <FiUser className="text-blue-500" />
                    <span>Profile</span>
                  </button>
                  <button 
                    onClick={() => navigateTo('/history')} 
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition duration-200
                              ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  >
                    <FiClock className="text-blue-500" />
                    <span>History</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition duration-200
                              ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  >
                    <FiLogOut className="text-red-500" />
                    <span className="text-red-500">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <button
            className={`fixed top-4 right-20 text-lg flex items-center gap-2
                      ${darkMode ? "text-gray-200" : "text-gray-800"} 
                      border ${darkMode ? "border-gray-600" : "border-gray-300"} 
                      bg-transparent rounded-full px-6 py-2 transition duration-300
                      hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-lg`}
            onClick={() => navigate('/login')}
          >
            <FiUser className="text-xl" />
            Login
          </button>
        )}
      </div>

      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-xl max-w-md w-full mx-4`}>
            <h3 className="text-xl font-bold mb-4">Login Required</h3>
            <p className="mb-6">Login to store your analysis history. Would you like to:</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Login
              </button>
              <button
                onClick={handleContinueWithoutLogin}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Continue without login
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center py-24 font-roboto">
        <h1 className="text-5xl flex items-center justify-center gap-6 text-blue-600 font-bold mb-6">
          <GiDroplets className="text-6xl animate-bounce" />
          Lake Water Quality Analysis
        </h1>
        <p className="mt-5 text-lg text-gray-600 dark:text-gray-400">
          Upload satellite images to analyze water quality parameters with advanced AI
        </p>
        <form onSubmit={handleSubmit} className="mx-auto mt-12 w-full max-w-2xl px-4">
          <FileUpload
            onFileChange={handleFileChange}
            selectedFile={selectedFile}
            fileSize={fileSize}
            previewUrl={previewUrl}
            onFileRemove={handleFileRemove}
            darkMode={darkMode}
          />
          <Input
            lakeName={lakeName}
            onLakeNameChange={(e) => setLakeName(e.target.value)}
            onSubmit={handleSubmit}
            darkMode={darkMode}
            setUsername={setUsername}
          />
        </form>
      </div>

      {isResultsOpen && (
        <Results
          result={result}
          darkMode={darkMode}
          isOpen={isResultsOpen}
          onClose={() => setIsResultsOpen(false)}
          lakeName={lakeName}
          previewUrl={previewUrl}
        />
      )}

      <Outlet />
    </div>
  );
}

export default PageLayout;