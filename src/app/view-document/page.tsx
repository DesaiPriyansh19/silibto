"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiX, FiUpload } from "react-icons/fi";

function Page() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setImage(imgURL);
    }
  };

  const handleDelete = () => {
    setImage(null);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-center my-6">View Document</h2>

      <div className="flex justify-center my-4 mx-4">
        {image ? (
          <div className="relative w-full max-w-4xl">
            <Image
              src={image}
              alt="Uploaded"
              width={1200}
              height={800}
              unoptimized
              className="w-full h-[80vh] object-contain rounded-lg border"
            />
            <button
              onClick={handleDelete}
              className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
            >
              <FiX size={20} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full max-w-4xl h-[80vh] border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100">
            <FiUpload size={30} className="text-gray-600 mb-2" />
            <span className="text-gray-600 font-medium">Upload Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="flex flex-row justify-center gap-2 sm:gap-3 my-8">
        <button className="bg-[#B3261E] text-black px-8 sm:px-4 py-3 sm:py-2 rounded-lg hover:scale-95">
          Save
        </button>
        <button className="bg-black text-white px-8 sm:px-4 py-3 sm:py-2 rounded-lg flex items-center gap-1 hover:scale-95">
          <FiX /> Cancel
        </button>
      </div>
    </>
  );
}

export default Page;
