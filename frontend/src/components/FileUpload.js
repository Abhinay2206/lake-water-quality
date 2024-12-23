import React from "react";
import { FiX } from "react-icons/fi";

const FileUpload = ({ onFileChange, selectedFile, fileSize, previewUrl, onFileRemove, darkMode }) => {
  const handleFileInputClick = () => {
    document.getElementById("file-input").click();
  };

  return (
    <div
      className={`w-full max-w-[725px] min-h-[300px] rounded-xl flex flex-col justify-center items-center mb-5 cursor-pointer text-center mx-auto p-8 
        ${darkMode 
          ? 'bg-gray-800/50 hover:bg-gray-800/70' 
          : 'bg-white/50 hover:bg-white/70'} 
        backdrop-blur-sm border-2 border-dashed 
        ${darkMode ? 'border-gray-600' : 'border-gray-300'}
        hover:border-blue-500 transition-all duration-300 shadow-lg`}
      onClick={handleFileInputClick}
    >
      <i className="bi bi-cloud-upload text-3xl text-blue-500 hover:text-blue-700 cursor-pointer mb-2.5"></i>
      <input
        type="file"
        id="file-input"
        onChange={onFileChange}
        accept=".jpg,.png,.jpeg"
        className="hidden"
      />
      <label
        className={`text-lg font-semibold cursor-pointer mb-2 
          ${darkMode ? 'text-gray-200' : 'text-gray-800'}
          hover:text-blue-500 transition-colors duration-200`}
      >
        {selectedFile ? selectedFile : "Choose the satellite image"}
      </label>
      {fileSize && (
        <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          File Size: {fileSize}
        </p>
      )}
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        Supported formats: JPG, JPEG, PNG (max 22MB)
      </p>
      
      {previewUrl && (
        <div className="mt-6 relative group">
          <img
            src={previewUrl}
            alt="Preview"
            // eslint-disable-next-line no-template-curly-in-string
            className="w-[120px] h-[120px] object-cover rounded-lg shadow-md 
              border-2 transition-transform duration-300 group-hover:scale-105
              ${darkMode ? 'border-gray-600' : 'border-gray-300'}"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFileRemove();
            }}
            className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white
              hover:bg-red-600 transition-colors duration-200 shadow-lg"
          >
            <FiX className="text-lg" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;