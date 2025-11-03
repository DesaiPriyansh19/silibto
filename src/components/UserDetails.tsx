"use client";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import Loading from "./Loading";

interface Brand {
  id: string;
  name: string;
  description?: string;
}

interface Branch {
  id: string;
  name: string;
  location?: string;
  brand: Brand;
}

interface User {
  id: string;
  fullName?: string;
  role: string;
  branches?: Branch[];
  mobileNumber?: string;
  email?: string;
  status?: "active" | "inactive";
    createdAt? :string;
  updatedAt?:string;
}

interface UserDetailsProps {
  userId: string;
  onClose: () => void;
}

export default function UserDetails({ userId, onClose }: UserDetailsProps) {
  const { token } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [allBranches, setAllBranches] = useState<Branch[]>([]);

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    role: "",
    status: "active",
        createdAt : "",
  updatedAt: "",
    branches: [] as string[],
  });

  // Fetch branches
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/branches`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setAllBranches(Array.isArray(data.docs) ? data.docs : []);
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || "Error fetching branches");
      }
    };
    fetchBranches();
  }, [token]);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          console.error("Payload Error:", data);
          toast.error(data.errors?.[0]?.message || "Failed to fetch user");
          return;
        }

        setUser(data);
        setFormData({
          fullName: data.fullName || "",
          mobileNumber: data.mobileNumber || "",
          email: data.email || "",
          role: data.role,
          status: data.status || "active",
          branches: data.branches?.map((b: Branch) => b.id) || [],
              createdAt :data.createdAt || "",
          updatedAt:data.updatedAt || "",
        });
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || "Error fetching user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setUpdating(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.errors?.[0]?.message || "Failed to update user");

      setUser(data);
      setEditing(false);
      toast.success("User updated successfully");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Error updating user");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    // Reset form data to original user data
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        mobileNumber: user.mobileNumber || "",
        email: user.email || "",
        role: user.role,
        status: user.status || "active",
        branches: user.branches?.map((b) => b.id) || [],
                createdAt :user.createdAt || "",
          updatedAt:user.updatedAt || "",
      });
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.errors?.[0]?.message || "Failed to delete user");
      toast.success("User deleted successfully");
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Error deleting user");
    } finally {
      setDeleting(false);
    }
  };

if (loading)
  return (
    <><Loading message="Fetching user details..."/></>
  );


if (!user)
  return (
    <div className="p-6 flex flex-col items-center justify-center text-center space-y-4">
      {/* Animated Icon */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" />
          </svg>
        </div>
      </div>

      {/* Message */}
      <h2 className="text-xl font-semibold text-gray-800 ">User Not Found</h2>
      <p className="text-gray-600">
        We couldn’t find the user you’re looking for. They may have been removed or don’t exist.
      </p>

      {/* Action */}
      <button
        onClick={() => window.history.back()}
        className="bg-[#5DD86E] hover:scale-95 text-sm text-black px-5 py-2 rounded-lg transition-transform "
      >
        Go Back
      </button>
    </div>
  );


  return (
    <div className="p-6">
      <Toaster position="top-right" />

      {/* Buttons */}
      <div className="flex justify-start gap-5 mb-6 text-sm">
        {!editing ? (
          <>
            <button
              className="bg-black  text-white px-4 py-2 rounded-lg hover:scale-95 transition"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-400 text-black px-4 py-2 rounded-lg hover:scale-95 transition"
              onClick={handleDelete}
              disabled={deleting}
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-[#5DD86E] text-black px-4 py-2 rounded-lg hover:scale-95 transition"
              onClick={handleSave}
              disabled={updating}
            >
              Save
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
          <label className="block font-medium">Full Name</label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            disabled={!editing}
            className="border-[2px] border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editing}
            className="border-[2px] border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Mobile Number</label>
          <input
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            disabled={!editing}
            className="border-[2px] border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={!editing}
            className="border-[2px] border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="admin">Admin</option>
            <option value="branch-admin">Branch Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={!editing}
            className="border-[2px] border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Branches</label>
          <select
            name="branches"
            multiple
            value={formData.branches}
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions).map((o) => o.value);
              setFormData((prev) => ({ ...prev, branches: selectedOptions }));
            }}
            disabled={!editing}
            className="border-[2px] border-gray-300 rounded-lg p-2 w-full"
          >
            {allBranches.length > 0 ? (
              allBranches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name} - {branch.location}
                </option>
              ))
            ) : (
              <option disabled>No branches available</option>
            )}
          </select>
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
