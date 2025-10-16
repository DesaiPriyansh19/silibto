"use client";

import React, { useState, FormEvent } from "react";
import { FiX } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";

export default function CreateFamilyGroup() {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    headName: "",
    reference: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("You must be logged in to create a family group");
      return;
    }

    if (!formData.headName) {
      toast.error("Head person name is required");
      return;
    }

    try {
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/family-groups`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    headName: formData.headName,
    reference: formData.reference || "",
  }),
});


      const result = await res.json();

      if (!res.ok) {
        console.error("Payload Error:", result);
        toast.error(result.errors?.[0]?.message || "Failed to create family group");
        return;
      }

      toast.success("Family group created successfully!");

      // Clear form
      setFormData({ headName: "", reference: "" });
    } catch (err) {
      console.error(err);
      toast.error("Error creating family group");
    }
  };

  const handleCancel = () => {
    setFormData({ headName: "", reference: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="px-6 py-6 bg-white rounded-lg w-full max-w-md mx-auto">

      <Toaster position="top-right" />
      <h2 className="text-xl font-semibold text-center my-5">Create Family Group</h2>

      <div className="flex gap-3 flex-col text-sm md:flex-row items-center justify-center">
        <input
          type="text"
          name="headName"
          value={formData.headName}
          onChange={handleChange}
          placeholder="Name of Head Person"
          className="border-[1.5px] border-black px-2 py-1 rounded-lg flex-1"
        />
        <input
          type="text"
          name="reference"
          value={formData.reference}
          onChange={handleChange}
          placeholder="Reference"
          className="border-[1.5px] border-black px-2 py-1 rounded-lg flex-1"
        />
      </div>

      <div className="flex flex-row justify-center gap-2 sm:gap-3 my-8">
        <button type="submit" className="bg-[#5DD86E] text-black px-8 sm:px-4 py-3 sm:py-2 rounded-lg hover:scale-95">
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-black text-white px-8 sm:px-4 py-3 sm:py-2 rounded-lg flex items-center gap-1 hover:scale-95"
        >
          <FiX /> Cancel
        </button>
      </div>
    </form>
  );
}
