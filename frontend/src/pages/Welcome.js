import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiDroplets } from "react-icons/gi";
import { BsArrowRightCircle } from "react-icons/bs";
import { FaRobot, FaChartLine, FaCloudUploadAlt } from "react-icons/fa";

const Welcome = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleContinue = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate('/page-layout');
    }, 600); 
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center justify-center min-h-screen">
      <div className={`text-center p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-lg max-w-4xl mx-4 border border-gray-200 transition-all duration-500 ${isAnimating ? 'scale-95 opacity-0' : ''}`}>
        <div className="flex items-center justify-center mb-8">
          <GiDroplets className="text-7xl text-blue-500 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Lake quality monitoring system
        </h1>
        <p className="text-gray-600 mb-12 text-xl leading-relaxed">
          Advanced water quality analysis powered by artificial intelligence.
          Upload satellite imagery and get instant insights about water bodies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <FaRobot className="text-4xl text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-600">State-of-the-art machine learning models for accurate water quality assessment</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <FaChartLine className="text-4xl text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Real-time Results</h3>
            <p className="text-gray-600">Get instant analysis with detailed parameters and confidence scores</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <FaCloudUploadAlt className="text-4xl text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Upload</h3>
            <p className="text-gray-600">Simple drag-and-drop interface for satellite imagery processing</p>
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="group bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-10 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition duration-300 flex items-center justify-center mx-auto gap-2 text-lg"
        >
          Get Started
          <BsArrowRightCircle className="text-xl group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};

export default Welcome;
