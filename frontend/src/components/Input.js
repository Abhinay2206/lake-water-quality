import React from "react";

const Input = ({ lakeName, onLakeNameChange, onSubmit, darkMode }) => {
  return (
    <div className={`w-full max-w-[725px] p-2.5 rounded-lg shadow-lg flex flex-col items-center transition-colors duration-200 ${
      darkMode ? 'bg-gray-800' : 'bg-white/50'
    }`}>
      <div className="w-full text-center">
        
        <input
          type="text"
          placeholder="Lake name *"
          value={lakeName}
          required
          onChange={onLakeNameChange}
          className={`w-full max-w-[600px] h-10 border rounded px-2.5 text-sm mt-7 mb-4 focus:outline-none transition-colors duration-200 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
              : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
        />

      </div>
      
      <button
        type="submit"
        onClick={onSubmit}
        className="w-[150px] h-[50px] bg-blue-500 text-white rounded text-base cursor-pointer mb-4 hover:bg-blue-600 transition-colors duration-200"
      >
        Analyze
        <i className="bi bi-send ml-4"></i>
      </button>
    </div>
  );
};

export default Input;