'use client'
import React, { useState } from "react";
import { FiX } from "react-icons/fi";

function AddNewClient() {
  const [gender, setGender] = useState("");

  return (
<div className="px-6 py-6 bg-white rounded-lg  w-full lg:px-16 xl:px-28">

  {/* Form Heading */}
  <h2 className="text-xl lg:text-2xl font-semibold mb-4">Add New Client</h2>

  {/* Name Fields (3 in one row on lg/xl) */}
  <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
    <input
      type="text"
      placeholder="First Name"
      className="border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none flex-1"
    />
    <input
      type="text"
      placeholder="Middle Name"
      className="border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none flex-1"
    />
    <input
      type="text"
      placeholder="Surname"
      className="border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none flex-1"
    />
  </div>

  {/* Gender and Phone in 2-column grid on lg */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
    {/* Gender */}
    <div>
      <h2 className="text-md font-semibold mb-2">Select Gender</h2>
      <div className="flex gap-4">
        {["Male", "Female", "Other"].map((g) => (
          <label key={g} className="flex items-center gap-1">
            <input
              type="radio"
              name="gender"
              value={g}
              checked={gender === g}
              onChange={(e) => setGender(e.target.value)}
              className="accent-black"
            />
            {g}
          </label>
        ))}
      </div>
    </div>

    {/* Phone Fields */}
    <div className="flex flex-col gap-3">
   <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Phone No 1"
          className="flex flex-c border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none"
        />
        <label className="flex items-center text-sm gap-1">
          <input type="checkbox" className="accent-black " />
          primery
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Phone No 2"
          className="flex flex-c border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none"
        />
        <label className="flex items-center text-sm gap-1">
          <input type="checkbox" className="accent-black " />
          primery
        </label>
      </div>
    </div>
  </div>

  {/* Address and Reference in 2-column grid on lg */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
    <input
      type="text"
      placeholder="Address"
      className="border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none w-full"
    />
    <input
      type="text"
      placeholder="Reference"
      className="border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none w-full"
    />
  </div>

  {/* Family Group and Create Button */}
  <div className="flex flex-row gap-3 mt-4 lg:items-center">
    <select className="flex-1 border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none">
      <option>Select Family Group</option>
      <option>Group A</option>
      <option>Group B</option>
    </select>
    <button className="bg-black text-white px-4 py-2 rounded-lg lg:ml-4">Create</button>
  </div>

  {/* Save & Next / Cancel Buttons */}
  <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
    <button className="bg-[#5DD86E] text-black px-4 py-2 rounded-lg hover:scale-95">Save & Next</button>
    <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:scale-95">
      <FiX /> Cancel
    </button>
  </div>
</div>


  );
}

export default AddNewClient;
