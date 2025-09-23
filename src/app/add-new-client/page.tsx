'use client'
import React, { useState } from "react";
import { FiX } from "react-icons/fi";

function AddNewClient() {
  const [gender, setGender] = useState("");

  return (
    <div className="px-6 py-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Form Heading */}
      <h2 className="text-xl font-semibold mb-4">Add New Client</h2>

      {/* Name Fields */}
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="First Name"
          className="border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none"
        />
        <input
          type="text"
          placeholder="Middle Name"
          className="border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none"
        />
        <input
          type="text"
          placeholder="Surname"
          className="border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none"
        />
      </div>

      {/* Gender Selection */}
      <h2 className="text-md font-semibold mt-4 mb-2">Select Gender</h2>
      <div className="flex gap-4 items-center mb-4">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={gender === "Male"}
            onChange={(e) => setGender(e.target.value)}
            className="accent-black"
          />
          Male
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={gender === "Female"}
            onChange={(e) => setGender(e.target.value)}
            className="accent-black"
          />
          Female
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="gender"
            value="Other"
            checked={gender === "Other"}
            onChange={(e) => setGender(e.target.value)}
            className="accent-black"
          />
          Other
        </label>
      </div>

      {/* Phone Fields */}
      <div className="flex flex-col gap-3 mb-4">
        <input
          type="text"
          placeholder="Phone No 1"
          className="border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none"
        />
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Phone No 2"
            className="flex-1 border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none"
          />
          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-black" />
            Same as Phone 1
          </label>
        </div>
      </div>

      {/* Address Field */}
      <input
        type="text"
        placeholder="Address"
        className="w-full border-[2px] border-gray-300 rounded-lg px-3 py-2 mb-4 outline-none"
      />

      {/* Reference Field */}
      <input
        type="text"
        placeholder="Reference"
        className="w-full border-[2px] border-gray-300 rounded-lg px-3 py-2 mb-4 outline-none"
      />

      {/* Family Group and Create Button */}
      <div className="flex items-center gap-3 mb-4">
        <select className="flex-1 border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none">
          <option>Select Family Group</option>
          <option>Group A</option>
          <option>Group B</option>
        </select>
        <button className="bg-black text-white px-4 py-2 rounded-lg">Create</button>
      </div>

      {/* Save & Next / Cancel Buttons */}
      <div className="flex justify-end gap-3">
        <button className="bg-[#5DD86E] text-black px-4 py-2 rounded-lg">Save & Next</button>
        <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-1">
          <FiX /> Cancel
        </button>
      </div>
    </div>
  );
}

export default AddNewClient;
