"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { FiX } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

interface FamilyGroup {
  id: string;
  headName: string;   // ✅ correct field name from Payload
  reference?: string; // optional
}


export default function AddNewClient() {
  const { token } = useAuth();
  const [gender, setGender] = useState("");
  const [familyGroups, setFamilyGroups] = useState<FamilyGroup[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    gender: "",
    phone1: "",
    phone1Primary: false,
    phone2: "",
    phone2Primary: false,
    address: "",
    reference: "",
    familyGroupId: "",
  });

  // Fetch family groups dynamically
  useEffect(() => {
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/family-groups`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setFamilyGroups(data.docs || []))
      .catch((err) => console.error("Error fetching family groups", err));
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("You must be logged in to add a client");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          middleName: formData.middleName,
          surname: formData.surname,
          gender: formData.gender,
          phone1: formData.phone1,
          phone1Primary: formData.phone1Primary,
          phone2: formData.phone2,
          phone2Primary: formData.phone2Primary,
          address: formData.address,
          reference: formData.reference,
          familyGroup: formData.familyGroupId || null,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Payload Error:", result);
        toast.error("Error adding client: " + (result.errors?.[0]?.message || "Unknown error"));
        return;
      }

      console.log("Client created:", result);
      toast.success("Client added successfully!");

      // Clear form
      setFormData({
        firstName: "",
        middleName: "",
        surname: "",
        gender: "",
        phone1: "",
        phone1Primary: false,
        phone2: "",
        phone2Primary: false,
        address: "",
        reference: "",
        familyGroupId: "",
      });
      setGender("");
    } catch (err) {
      console.error(err);
      toast.error("Error adding client");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-6 py-6 bg-white rounded-lg w-full lg:px-16 xl:px-28">
      <Toaster position="top-right" />

      <h2 className="text-xl lg:text-2xl font-semibold mb-4">Add New Client</h2>

      {/* Name Fields */}
      <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
        <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" placeholder="First Name" className="border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none flex-1" />
        <input name="middleName" value={formData.middleName} onChange={handleChange} type="text" placeholder="Middle Name" className="border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none flex-1" />
        <input name="surname" value={formData.surname} onChange={handleChange} type="text" placeholder="Surname" className="border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none flex-1" />
      </div>

      {/* Gender & Phones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div>
          <h2 className="text-md font-semibold mb-2">Select Gender</h2>
          <div className="flex gap-4">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="flex items-center gap-1">
                <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={(e) => { setGender(e.target.value); setFormData((prev) => ({ ...prev, gender: e.target.value })); }} className="accent-black" />
                {g}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex md:flex-row gap-2 items-center">
            <input name="phone1" value={formData.phone1} onChange={handleChange} type="text" placeholder="Phone No 1" className="flex w-[80%] md:w-full border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none" />
            <label className="flex items-center text-[.7rem] sm:text-sm gap-1">
              <input name="phone1Primary" type="checkbox" checked={formData.phone1Primary} onChange={handleChange} className="accent-black" /> Primary
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <input name="phone2" value={formData.phone2} onChange={handleChange} type="text" placeholder="Phone No 2" className="flex w-[80%] md:w-full border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none" />
            <label className="flex items-center text-[.7rem] sm:text-sm gap-1">
              <input name="phone2Primary" type="checkbox" checked={formData.phone2Primary} onChange={handleChange} className="accent-black" /> Primary
            </label>
          </div>
        </div>
      </div>

      {/* Address & Reference */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <input name="address" value={formData.address} onChange={handleChange} type="text" placeholder="Address" className="border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none w-full" />
        <input name="reference" value={formData.reference} onChange={handleChange} type="text" placeholder="Reference" className="border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none w-full" />
      </div>

      {/* Family Group */}
      <div className="flex flex-row gap-3 mt-4 lg:items-center">
        <select name="familyGroupId" value={formData.familyGroupId} onChange={handleChange} className="flex-1 border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none">
          <option value="">Select Family Group</option>
  {familyGroups.map((fg) => (
  <option key={fg.id} value={fg.id}>
    {fg.headName}
  </option>
))}

        </select>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
        <button type="submit" className="bg-[#5DD86E] text-black px-4 py-2 rounded-lg hover:scale-95">Save & Next</button>
        <button type="button" className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:scale-95">
          <FiX /> Cancel
        </button>
      </div>
    </form>
  );
}
