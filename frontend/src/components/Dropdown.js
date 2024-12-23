import React from "react";

const Dropdown = ({ isOpen, toggleDropdown, navigateTo, darkMode }) => {
  if (!isOpen) return null;

  return (
    <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 ${darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
      <button onClick={() => { navigateTo('/profile'); toggleDropdown(); }} className="block px-4 py-2 hover:bg-blue-500 hover:text-white">
        Profile
      </button>
      <button onClick={() => { navigateTo('/history'); toggleDropdown(); }} className="block px-4 py-2 hover:bg-blue-500 hover:text-white">
        History
      </button>
    </div>
  );
};

export default Dropdown;