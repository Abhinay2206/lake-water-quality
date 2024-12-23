/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from '../components/DarkModeContext';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { darkMode } = useDarkMode();

  const handleSignIn = () => {
    if (username && password) {
      navigate("/page-layout", { state: { username } });
    } else {
      alert("Please enter your username and password.");
    }
  };  

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200" : "bg-gradient-to-br from-blue-50 to-blue-200 text-gray-800"}`}>
      
      <div className={`w-full flex flex-col justify-center items-center ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8`}>
        <h1 className="text-4xl font-bold mb-2 text-blue-600">Login</h1>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
          Please enter your details to continue...
        </p>
        <form className="w-full max-w-sm">
            
          <div className="mb-4">
            <label
              htmlFor="username"
              className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm font-bold mb-2`}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white text-gray-700'
              }`}
            />
          </div>
          
          <div className="mb-4">
            <label
              htmlFor="password"
              className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm font-bold mb-2`}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white text-gray-700'
              }`}
            />
          </div>
          
          
          <div className="mb-4">
            <button
              type="button"
              onClick={handleSignIn}
              className="w-full bg-blue-400 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
          
          
          <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
            New user?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleSignUp();
              }}
              className="text-blue-500 font-bold"
              role="button"
            >
              Sign up...
            </a>

          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;