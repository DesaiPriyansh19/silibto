"use client";
import React from "react";

interface FallbackProps {
  title?: string;
  message?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const Fallback: React.FC<FallbackProps> = ({
  title = "Data Not Found",
  message = "The requested data could not be loaded.",
  buttonText = "Go Back",
  onButtonClick,
}) => {
  return (
    <div className="p-6 flex flex-col items-center justify-center text-center space-y-2">
      {/* Animated Icon */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z"
            />
          </svg>
        </div>
      </div>

      {/* Title & Message */}
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600">{message}</p>

      {/* Action Button */}
      {buttonText && (
        <button
          onClick={onButtonClick || (() => window.history.back())}
          className="bg-[#5DD86E] hover:scale-95 text-sm text-black px-5 py-2 mt-4 rounded-lg transition-transform"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default Fallback;
