"use client";

import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Loading from "./Loading";
import Fallback from "./FallBack";
import { useRouter } from "next/navigation";

interface VendorDetailsProps {
  vendorId: string;
  onClose: () => void;
}

interface VendorData {
  id: string;
  companyName: string;
  contactPerson: string;
  contactNumber: string;
  gstNumber: string;
  address?: string;
  email?: string;
  createdAt? :string;
  updatedAt?:string;
}

export default function VendorDetails({ vendorId, onClose }: VendorDetailsProps) {
  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [formData, setFormData] = useState<Partial<VendorData>>({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const router = useRouter();

  useEffect(() => {
    fetchVendor();
  }, [vendorId]);

  const fetchVendor = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/vendors/${vendorId}?depth=1`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setVendor(data);
        setFormData(data);
      } else toast.error("Failed to fetch vendor details");
    } catch (err) {
      console.error(err);
      toast.error("Error fetching vendor details");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!token) return;
    setUpdating(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/vendors/${vendorId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Vendor updated successfully");
        setEditing(false);
        fetchVendor();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to update vendor");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update vendor");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setFormData(vendor || {});
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this vendor?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/vendors/${vendorId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Vendor deleted successfully");
        onClose();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to delete vendor");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete vendor");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loading message="Fetching vendor details..." />;

  if (!vendor)
    return (
      <Fallback
        title="No Vendor Found"
        message="We couldn’t find this vendor."
        buttonText="Go to Vendors"
        onButtonClick={() => router.push("/vendors/vendor-list")}
      />
    );

  return (
    <div className="p-6 bg-white min-h-screen">
      <Toaster position="top-right" />

      {/* Back button */}
      <button
        className="absolute top-6 right-6 bg-gray-300 hover:scale-95 text-black px-4 py-2 rounded-lg transition"
        onClick={onClose}
      >
        Back
      </button>

      {/* Buttons */}
      <div className="flex justify-start gap-5 mb-6 text-sm">
        {!editing ? (
          <>
            <button
              className="bg-black text-white px-4 py-2 rounded-lg hover:scale-95 transition"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-400 text-black px-4 py-2 rounded-lg hover:scale-95 transition"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-[#5DD86E] text-black px-4 py-2 rounded-lg hover:scale-95 transition"
              onClick={handleSave}
              disabled={updating}
            >
              {updating ? "Saving..." : "Save"}
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:scale-95 transition"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </>
        )}
      </div>


      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
 {/* "createdAt": "2025-11-03T06:54:39.993Z",
    "updatedAt": "2025-11-03T06:54:39.993Z", */}
   
        <div>
          <label className="block font-medium">Company Name</label>
          <input
            name="companyName"
            value={formData.companyName || ""}
            onChange={handleChange}
            disabled={!editing}
            className="border-[2px] border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Contact Person</label>
          <input
            name="contactPerson"
            value={formData.contactPerson || ""}
            onChange={handleChange}
            disabled={!editing}
            className="border-[2px] border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Contact Number</label>
          <input
            name="contactNumber"
            value={formData.contactNumber || ""}
            onChange={handleChange}
            disabled={!editing}
            className="border-[2px] border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium">GST Number</label>
          <input
            name="gstNumber"
            value={formData.gstNumber || ""}
            onChange={handleChange}
            disabled={!editing}
            className="border-[2px] border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <input
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            disabled={!editing}
            className="border-[2px] border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            disabled={!editing}
            className="border-[2px] border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      </div>
       {/* Metadata Section */}
<div className="flex flex-wrap items-center justify-between bg-gray-50 border border-gray-200 rounded-sm px-4 py-3 mt-6 ">
  {/* Created At */}
  <div className="flex flex-col">
    <span className="text-xs uppercase tracking-wide text-gray-500">Created At</span>
    <span className="text-sm font-semibold text-gray-800">
      {formData.createdAt
        ? new Date(formData.createdAt).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          })
        : "—"}
    </span>
  </div>

  {/* Updated At */}
  <div className="flex flex-col text-right">
    <span className="text-xs uppercase tracking-wide text-gray-500">Last Updated</span>
    <span className="text-sm font-semibold text-gray-800">
      {formData.updatedAt
        ? new Date(formData.updatedAt).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          })
        : "—"}
    </span>
  </div>
</div>
    </div>
  );
}
