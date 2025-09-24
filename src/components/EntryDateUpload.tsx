"use client";

import { useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AiOutlineCamera } from "react-icons/ai";

export default function EntryDateUpload() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB"); // format: dd/mm/yyyy
  };

  const handlePrevDate = () => {
    const prev = new Date(currentDate);
    prev.setDate(currentDate.getDate() - 1);
    setCurrentDate(prev);
  };

  const handleNextDate = () => {
    const next = new Date(currentDate);
    next.setDate(currentDate.getDate() + 1);
    setCurrentDate(next);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click(); // trigger hidden input
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
      // You can now upload the file to server or show preview
    }
  };

  return (
    <div className="flex justify-between items-center p-4 rounded-lg my-2">
      {/* Left side: Entry Date */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-gray-600 font-medium">Entry Date</span>
        <div className="flex items-center gap-2 text-gray-800 font-semibold">
          <button
            onClick={handlePrevDate}
            className="p-1 rounded hover:bg-gray-100"
          >
            <FiChevronLeft size={18} />
          </button>
          <span>{formatDate(currentDate)}</span>
          <button
            onClick={handleNextDate}
            className="p-1 rounded hover:bg-gray-100"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Right side: Upload */}
      <div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={handleUploadClick}
          className="flex items-center gap-2 border border-gray-400 px-4 py-2 rounded hover:bg-gray-50 text-gray-800 font-medium"
        >
          <AiOutlineCamera size={20} />
          Upload New Prescription
        </button>
      </div>
    </div>
  );
}
