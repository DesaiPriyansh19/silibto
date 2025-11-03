"use client";

import React, { useState, FormEvent } from "react";
import { FiX } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

export default function AddNewVendor() {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    contactNumber: "",
    gstNumber: "",
    address: "",
    email: "",
  });

  const [loading, setLoading] = useState(false); // ✅ Loader + Lock

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("You must be logged in to add a vendor");
      return;
    }

    setLoading(true); // 🟢 Start loader

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/vendors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Payload Error:", result);
        toast.error("Error adding vendor: " + (result.errors?.[0]?.message || "Unknown error"));
        setLoading(false);
        return;
      }

      toast.success("Vendor added successfully!");
      console.log("Vendor created:", result);

      // Reset form
      setFormData({
        companyName: "",
        contactPerson: "",
        contactNumber: "",
        gstNumber: "",
        address: "",
        email: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Error adding vendor");
    } finally {
      setLoading(false); // 🔴 Stop loader
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-6 py-6 bg-white rounded-lg w-full lg:px-16 xl:px-28 shadow-md relative"
    >
      <Toaster position="top-right" />
      <h2 className="text-xl lg:text-2xl font-semibold mb-4">Add New Vendor</h2>

      {/* Company Name & Contact Person */}
      <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
        <input
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          type="text"
          placeholder="Company Name"
          className="border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none flex-1"
          required
          disabled={loading}
        />
        <input
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          type="text"
          placeholder="Contact Person"
          className="border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none flex-1"
          required
          disabled={loading}
        />
      </div>

      {/* Contact & GST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <input
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          type="text"
          placeholder="Contact Number"
          className="border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none w-full"
          required
          disabled={loading}
        />
        <input
          name="gstNumber"
          value={formData.gstNumber}
          onChange={handleChange}
          type="text"
          placeholder="GST Number"
          className="border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none w-full"
          required
          disabled={loading}
        />
      </div>

      {/* Address */}
      <div className="mt-4">
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          rows={3}
          className="border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none w-full"
          required
          disabled={loading}
        />
      </div>

      {/* Email */}
      <div className="mt-4">
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Email (optional)"
          className="border-[2px] border-gray-300 rounded-lg px-3 py-2 outline-none w-full"
          disabled={loading}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-[#5DD86E] text-black hover:scale-95"
          }`}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            "Save Vendor"
          )}
        </button>

        <button
          type="button"
          onClick={() =>
            setFormData({
              companyName: "",
              contactPerson: "",
              contactNumber: "",
              gstNumber: "",
              address: "",
              email: "",
            })
          }
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:scale-95 transition-all"
        >
          <FiX /> Cancel
        </button>
      </div>
    </form>
  );
}
