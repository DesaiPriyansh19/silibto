"use client"
import React, { useEffect, useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

interface Branch {
  id: string;
  name: string;
}

export default function CreateUserForm() {
  const { token, user } = useAuth();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loadingBranches, setLoadingBranches] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    mobileNumber: "",
    role: "employee",
    status: "active",
    branch: "",
  });

  // Fetch branches for logged-in user's brand
  useEffect(() => {
    if (!token || !user?.brand?.id) return;

    const fetchBranches = async () => {
      setLoadingBranches(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/branches?brand=${user.brand.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setBranches(data.docs || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch branches");
      } finally {
        setLoadingBranches(false);
      }
    };

    fetchBranches();
  }, [token, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          mobileNumber: formData.mobileNumber,
          role: formData.role,
          status: formData.status,
          branches: formData.branch ? [formData.branch] : [],
    brand: user?.brand?.id || "",

        }),
      });

      const result = await res.json();
      if (!res.ok) {
        console.error(result);
        toast.error(result.errors?.[0]?.message || "Failed to create user");
        return;
      }

      toast.success("User created successfully!");
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        mobileNumber: "",
        role: "employee",
        status: "active",
        branch: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Error creating user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg max-w-5xl mx-auto">
      <Toaster position="top-right" />
      <h2 className="text-xl font-semibold mb-6">Create New User</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Email *"
          required
          className="border px-3 py-2 rounded-lg w-full"
        />

        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="New Password *"
          required
          className="border px-3 py-2 rounded-lg w-full"
        />

        <input
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          type="password"
          placeholder="Confirm Password *"
          required
          className="border px-3 py-2 rounded-lg w-full"
        />

        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          type="text"
          placeholder="Full Name *"
          required
          className="border px-3 py-2 rounded-lg w-full"
        />

        <input
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          type="text"
          placeholder="Mobile Number *"
          required
          className="border px-3 py-2 rounded-lg w-full"
        />

        {/* Branch Dropdown */}
        <select
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          required
          disabled={loadingBranches || !branches.length}
          className="border px-3 py-2 rounded-lg w-full"
        >
          <option value="">{loadingBranches ? "Loading branches..." : "Select Branch *"}</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        {/* Role */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg w-full"
        >
          <option value="admin">Admin</option>
          <option value="branch-admin">Branch Admin</option>
          <option value="employee">Employee</option>
        </select>

        {/* Status */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg w-full"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-6 w-full md:w-auto"
      >
        Create User
      </button>
    </form>
  );
}
