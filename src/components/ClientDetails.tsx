"use client";

import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Loading from "./Loading";
import Fallback from "./FallBack";
import router from "next/router";

interface ClientDetailsProps {
  clientId: string;
  onClose: () => void;
}

interface ClientData {
  length: number;
  firstName: string;
  middleName?: string;
  surname: string;
  gender: string;
  phone1: string;
  phone2?: string;
  address?: string;
  reference?: string;
  familyGroup?: { id: string; headName?: string };
}

export default function ClientDetails({ clientId, onClose }: ClientDetailsProps) {
  const [client, setClient] = useState<ClientData | null>(null);
  const [formData, setFormData] = useState<ClientData | any>({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const token = localStorage.getItem("token"); // or use your auth context

  useEffect(() => {
    fetchClient();
  }, [clientId]);

  const fetchClient = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/clients/${clientId}?depth=1`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setClient(data);
        setFormData(data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch client data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!token) return;
    setUpdating(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/clients/${clientId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Client updated successfully");
        setEditing(false);
        fetchClient();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to update client");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update client");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setFormData(client);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this client?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/clients/${clientId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Client deleted successfully");
        onClose(); // go back to client list
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to delete client");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete client");
    } finally {
      setDeleting(false);
    }
  };

if (loading)
  return (
    <><Loading message="Fetching user details..."/></>
  );



  if (!client || client.length === 0)
  return (
    <Fallback
      title="No Clients Found"
      message="We couldn’t find any clients in the system."
      buttonText="Go to Dashboard"
      onButtonClick={() => router.push("/dashboard")}
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
        <div>
          <label className="block font-medium">First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled={!editing}
            className="border-[2px] border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Middle Name</label>
          <input
            name="middleName"
            value={formData.middleName || ""}
            onChange={handleChange}
            disabled={!editing}
            className="border-[2px] border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Surname</label>
          <input
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            disabled={!editing}
            className="border-[2px] border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            disabled={!editing}
            className="border-[2px] border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Phone 1</label>
          <input
            name="phone1"
            value={formData.phone1}
            onChange={handleChange}
            disabled={!editing}
            className="border-[2px] border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Phone 2</label>
          <input
            name="phone2"
            value={formData.phone2 || ""}
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
          <label className="block font-medium">Reference</label>
          <input
            name="reference"
            value={formData.reference || ""}
            onChange={handleChange}
            disabled={!editing}
            className="border-[2px] border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      </div>
    </div>
  );
}
