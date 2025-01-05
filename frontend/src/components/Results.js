import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import jsPDF from "jspdf";

const Results = ({ result, darkMode, isOpen, onClose, lakeName, previewUrl }) => {
  if (!result || !isOpen) return null;

  const prediction = result.prediction;
  const status = prediction === 1 ? "Good Quality" : "Poor Quality";

  const handleDownload = async () => {
    const doc = new jsPDF();

    doc.setFillColor(darkMode ? 35 : 255, darkMode ? 41 : 255, darkMode ? 49 : 255);
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
    
    doc.setTextColor(darkMode ? 229 : 31, darkMode ? 231 : 41, darkMode ? 235 : 55);

    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text("Water Quality Analysis Results", 20, 30);

    doc.setFontSize(18);
    doc.setFont(undefined, 'normal');
    doc.text(`Lake Name: ${lakeName}`, 20, 50);

    if (previewUrl) {
      try {
        doc.addImage(previewUrl, 'JPEG', 20, 60, 80, 80);
      } catch (error) {
        console.error("Error adding image to PDF:", error);
      }
    }

    const statusY = previewUrl ? 160 : 70;
    
    doc.setFillColor(prediction === 1 ? 34 : 239, prediction === 1 ? 197 : 68, prediction === 1 ? 94 : 68);
    doc.roundedRect(20, statusY, 80, 25, 10, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text(status, 30, statusY + 16);

    doc.setTextColor(darkMode ? 229 : 31, darkMode ? 231 : 41, darkMode ? 235 : 55);

    const qualityY = statusY + 40;
    doc.setDrawColor(darkMode ? 75 : 209, darkMode ? 85 : 213, darkMode ? 99 : 219);
    doc.setFillColor(darkMode ? 55 : 249, darkMode ? 65 : 250, darkMode ? 81 : 251);
    doc.roundedRect(20, qualityY, 170, 50, 3, 3, 'FD');
    
    doc.setFontSize(16);
    doc.text("Water Quality", 30, qualityY + 20);
    doc.setFontSize(24);
    doc.setTextColor(prediction === 1 ? 34 : 239, prediction === 1 ? 197 : 68, prediction === 1 ? 94 : 68);
    doc.text(status, 30, qualityY + 40);

    const date = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.setTextColor(darkMode ? 156 : 107, darkMode ? 163 : 114, darkMode ? 175 : 128);
    doc.text(date, doc.internal.pageSize.width - 20, 20, { align: 'right' });

    doc.save("water-quality-analysis.pdf");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`relative flex flex-col items-center justify-start w-full max-w-md p-6 rounded-lg shadow-lg ${
          darkMode ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-800"
        } border`}
      >
        <button
          onClick={onClose}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          <AiOutlineClose size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
        <button
          className={`px-4 py-2 rounded-full font-semibold mb-4 flex items-center gap-2 ${
            prediction === 1 
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          <i className="bi bi-check2-all"></i>
          {status}
        </button>

        <div
          className={`flex flex-col justify-center items-start w-full mt-5 mb-4 p-4 rounded-lg border ${
            darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-300"
          }`}
        >
          <div className="text-xl font-bold">Water Quality</div>
          {previewUrl && (
            <img src={previewUrl} alt="Lake water" className="w-full h-48 object-cover rounded-lg my-4" />
          )}
          <div className={`text-4xl font-extrabold ${prediction === 1 ? "text-green-500" : "text-red-500"} mt-4`}>
            {status}
          </div>
        </div>

        <button
          onClick={handleDownload}
          className={`mt-6 px-6 py-2 rounded-full font-semibold flex items-center gap-2 
            ${darkMode 
              ? "bg-blue-600 hover:bg-blue-700" 
              : "bg-blue-500 hover:bg-blue-600"
            } text-white transition-colors duration-200`}
        >
          <FiDownload size={18} />
          Download Results
        </button>
      </div>
    </div>
  );
};

export default Results;