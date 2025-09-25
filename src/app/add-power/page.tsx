'use client'
import React from 'react'
 import { FiX } from "react-icons/fi";
 import { useState, useRef } from "react";
import { AiOutlineCamera } from "react-icons/ai";
function AddPower() {

      const fileInputRef = useRef<HTMLInputElement | null>(null);
    
   
    
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
    <div>
            <h2 className='text-xl font-semibold text-center my-5'>Add Client Power</h2 >
                   <div className="flex flex-col  md:flex-row gap-5 md:gap-3 py-6 md:px-4 lg:px-14  overflow-hidden items-center justify-between my-4 lg:my-6 ">
<div className=" shadoww bg-[#e6f3fb] border-4 pb-2 border-[#88C9F2] rounded-xl w-[95%] sm:w-[400px]">
  <div className="flex justify-between rounded-t-lg py-2 pl-4 pr-3 bg-[#88C9F2]  items-center mb-2">
    <h2 className="font-bold ">Right Eye</h2>
    <button className=" px-2 text-lg font-medium mr-4 border-2 rounded">+</button>
  </div>

  <div className="grid grid-cols-5 px-4 gap-2 text-left  font-bold">
    <div></div>
    <div>SPH</div>
    <div>CYL</div>
    <div>AXIS</div>
    <div>ADD</div>
  </div>

  {["DIS", "NEAR", "COM"].map((type) => (
    <div key={type} className="grid px-4 grid-cols-5 gap-2 items-center mb-1">
      <div>
        <input type="checkbox" defaultChecked className="mr-1" />
        <span className="font-bold">{type}</span>
      </div>
      <input
        type="text"
        defaultValue={type === "DIS" ? "-10.10" : ""}
        className="bg-white rounded p-1"
      />
      <input type="text" className="bg-white  rounded p-1" />
      <input type="text" className="bg-white rounded p-1" />
      <input type="text" className="bg-white rounded p-1" />
    </div>
  ))}
</div>

<div className="shadoww hover: hover:shadoww2 bg-[#ffebeb] border-4 pb-2 border-[#FFB1B1] rounded-xl w-[95%] sm:w-[400px] ">
  <div className="flex justify-between rounded-t-lg py-2 pl-4 pr-3 bg-[#FFB1B1]  items-center mb-2">
    <h2 className="font-bold ">Left Eye</h2>
    <button className=" px-2 text-lg font-medium mr-4 border-2 rounded">+</button>
  </div>

  <div className="grid grid-cols-5 px-4 gap-2 text-left  font-bold">
    <div></div>
    <div>SPH</div>
    <div>CYL</div>
    <div>AXIS</div>
    <div>ADD</div>
  </div>

  {["DIS", "NEAR", "COM"].map((type) => (
    <div key={type} className="grid px-4 grid-cols-5 gap-2 items-center mb-1">
      <div>
        <input type="checkbox" defaultChecked className="mr-1 " />
        <span className="font-bold">{type}</span>
      </div>
      <input
        type="text"
        defaultValue={type === "DIS" ? "-10.10" : ""}
        className="bg-white rounded p-1"
      />
      <input type="text" className="bg-white rounded p-1" />
      <input type="text" className="bg-white rounded p-1" />
      <input type="text" className="bg-white rounded p-1" />
    </div>
  ))}
</div>
</div>
   {/* Right side: Upload */}
      <div className='flex items-center justify-center'>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={handleUploadClick}
          className="flex items-center   text-sm sm:gap-2 border border-gray-400 mr-2  px-2 sm:px-4 py-2 rounded hover:bg-gray-50 text-gray-800 font-medium"
        >
          <AiOutlineCamera size={50} />
          Upload New Prescription
        </button>
      </div>
          <div className=" flex flex-row justify-center gap-2 sm:gap-3 my-8">
                          <button className="bg-[#5DD86E]  text-black px-8 sm:px-4 py-3 sm:py-2 rounded-lg hover:scale-95">Save Client</button>
                          <button className="bg-black text-white px-8 sm:px-4 py-3 sm:py-2 rounded-lg flex items-center gap-1 hover:scale-95">
                            <FiX /> Cancel
                          </button>
                        </div>
    </div>
  )
}

export default AddPower