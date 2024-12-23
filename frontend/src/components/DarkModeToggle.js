import React from 'react';
import { useDarkMode } from './DarkModeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const DarkModeToggle = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <button
            onClick={toggleDarkMode}
            className={`fixed top-4 right-4 p-2 rounded-full transition-colors duration-200 ${
                darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
            }`}
            aria-label="Toggle dark mode"
        >
            {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-700" />}
        </button>
    );
};

export default DarkModeToggle;