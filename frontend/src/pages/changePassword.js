import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbArrowBackUpDouble } from "react-icons/tb";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No user found. Please log in.");
      setSuccess("");
      return;
    }

    if (currentPassword !== storedUser.password) {
      setError("Current password is incorrect.");
      setSuccess("");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      setSuccess("");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      setSuccess("");
      return;
    }

    storedUser.password = newPassword;

    localStorage.setItem("user", JSON.stringify(storedUser));

    setSuccess("Password updated successfully!");
    setError("");
  };

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        navigate("/profile"); 
      }, 2000); 

      return () => clearTimeout(timeout); 
    }
  }, [success, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 relative">
      <button
        onClick={() => navigate("/profile")}
        className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        <TbArrowBackUpDouble />
      </button>
      <h1 className="text-4xl font-bold mb-6">Change Password</h1>
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handlePasswordChange}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;

