import React from "react";
import { useNavigate } from "react-router-dom";
import { TbArrowBackUpDouble } from "react-icons/tb";
import { useDarkMode } from '../components/DarkModeContext'; 

const History = ({ username }) => { 
  const navigate = useNavigate(); 
  const {darkMode} = useDarkMode();

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'} relative`}>
      <button
        onClick={() => navigate("/page-layout", { state: { username } })} 
        className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        <TbArrowBackUpDouble />
      </button>
      <h1 className="text-4xl font-bold mb-4">History Page</h1>
    </div>
  );
};

export default History;