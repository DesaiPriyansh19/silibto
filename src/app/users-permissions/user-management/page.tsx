"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
// Interfaces
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
  status?: "active" | "inactive";
}

export default function UserManagement() {
  const { token, user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string[]>([]);
const router = useRouter();
  // Filters
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Dynamic filter options
  const [roles, setRoles] = useState<string[]>([]);
  const [branches, setBranches] = useState<string[]>([]);

  // Fetch users
  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          console.error("Error fetching users:", data);
          toast.error(data.errors?.[0]?.message || "Cannot fetch users. You might not have permission.");
          setUsers([]);
          return;
        }

        const usersData = data.docs || data;
        setUsers(usersData);

        // Extract dynamic roles and branches
const rolesSet = new Set(usersData.map((u: User) => u.role));
setRoles(Array.from(rolesSet) as string[]);

const branchesSet = new Set(
  usersData.flatMap((u: User) => u.branches?.map((b) => b.name) || [])
);
setBranches(Array.from(branchesSet) as string[]);


      } catch (err) {
        console.error(err);
        toast.error("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "admin") fetchUsers();
    else {
      toast.error("You do not have permission to view users");
      setLoading(false);
    }
  }, [token, user]);

  // Toggle user status
  const toggleUserStatus = async (userId: string, currentStatus: "active" | "inactive") => {
    setUpdatingStatus((prev) => [...prev, userId]);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: currentStatus === "active" ? "inactive" : "active" }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Error updating status:", data);
        toast.error(data.errors?.[0]?.message || "Failed to update status");
        return;
      }

      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, status: currentStatus === "active" ? "inactive" : "active" } : u
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Error updating status");
    } finally {
      setUpdatingStatus((prev) => prev.filter((id) => id !== userId));
    }
  };

  // Filter users
  const filteredUsers = users.filter((u) => {
    const name = u.fullName || "";
    const mobile = u.mobileNumber || "";
    const matchesSearch = name.toLowerCase().includes(search.toLowerCase()) || mobile.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter ? u.role === roleFilter : true;
    const matchesBranch = branchFilter ? u.branches?.some((b) => b.name === branchFilter) : true;
    const matchesStatus = statusFilter ? u.status === statusFilter : true;
    return matchesSearch && matchesRole && matchesBranch && matchesStatus;
  });

  return (
    <div className="p-2 md:p-6  min-h-screen">
      <Toaster position="top-right" />
      <h2 className="text-xl font-semibold mb-4">User Management</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 items-end text-sm">
        <input
          type="text"
          placeholder="Search by Name or Mobile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-[2px] border-gray-300 rounded-lg text-black p-2 flex-1"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border-[2px] border-gray-300 rounded-lg p-2"
        >
          <option value="">All Roles</option>
          {roles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <select
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
          className="border-[2px] border-gray-300 rounded-lg p-2"
        >
          <option value="">All Branches</option>
          {branches.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border-[2px] border-gray-300 rounded-lg p-2"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border-[2px] border-gray-300 bg-white rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="font-medium">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Branches</th>
              <th className="px-4 py-2 text-left">Mobile</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Manage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm xl:text-lg">
       {loading ? (
  // Skeleton Loader (Table Rows)
  Array.from({ length: 6 }).map((_, idx) => (
    <tr key={idx} className="animate-pulse">
      {Array.from({ length: 6 }).map((__, colIdx) => (
        <td key={colIdx} className="px-4 py-3">
          <div className="relative overflow-hidden rounded-md bg-gray-200 h-5 w-full">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </div>
        </td>
      ))}
    </tr>
  ))
) : (
  // Actual data rows
  filteredUsers.map((user) => (
    <tr key={user.id} className="hover:bg-gray-50 transition">
      <td className="px-4 py-2">{user.fullName}</td>
      <td className="px-4 py-2 capitalize">{user.role}</td>
      <td className="px-4 py-2">{user.branches?.map((b) => b.name).join(", ")}</td>
      <td className="px-4 py-2">{user.mobileNumber}</td>

      {/* Status toggle */}
      <td className="px-4 py-2">
        <button
          className={`
            relative w-12 h-6 rounded-full transition-all
            ${user.status === "active" ? "bg-green-500" : "bg-red-500"}
            ${updatingStatus.includes(user.id) ? "opacity-60 cursor-not-allowed" : ""}
          `}
          onClick={() => toggleUserStatus(user.id, user.status || "inactive")}
          disabled={updatingStatus.includes(user.id)}
        >
          <span
            className={`
              absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all
              ${user.status === "active" ? "translate-x-6" : "translate-x-0"}
            `}
          />
        </button>
      </td>

      <td className="px-4 py-2">
        <button
          className="bg-[#8BE497] hover:scale-95 text-black px-3 py-1 rounded-lg transition"
          onClick={() => router.push(`/users-permissions/user-details/${user.id}`)}
        >
          manage
        </button>
      </td>
    </tr>
  ))
)}

          </tbody>
        </table>
      </div>
    </div>
  );
}
