"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

type User = {
  id: number;
  name: string;
  role: string;
  branches: string[];
  mobile: string;
  isActive: boolean;
};

type PermissionSection = {
  heading: string;
  permissions: string[];
};

export default function UserManagement() {
  const [expandedPermissions, setExpandedPermissions] = useState<number | null>(null);
  const [checkedPermissions, setCheckedPermissions] = useState<{ [key: string]: boolean }>({});
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      role: "Admin",
      branches: ["Mumbai", "Ahmedabad"],
      mobile: "1234567890",
      isActive: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Employee",
      branches: ["Delhi"],
      mobile: "9876543210",
      isActive: false,
    },
     {
      id: 3,
      name: "John Doe",
      role: "Admin",
      branches: ["Mumbai", "Ahmedabad"],
      mobile: "1234567890",
      isActive: true,
    },
    {
      id: 3,
      name: "Jane Smith",
      role: "Employee",
      branches: ["Delhi"],
      mobile: "9876543210",
      isActive: false,
    },
     {
      id: 4,
      name: "John Doe",
      role: "Admin",
      branches: ["Mumbai", "Ahmedabad"],
      mobile: "1234567890",
      isActive: true,
    },
    {
      id: 5,
      name: "Jane Smith",
      role: "Employee",
      branches: ["Delhi"],
      mobile: "9876543210",
      isActive: false,
    },
     {
      id: 6,
      name: "John Doe",
      role: "Admin",
      branches: ["Mumbai", "Ahmedabad"],
      mobile: "1234567890",
      isActive: true,
    },
    {
      id: 7,
      name: "Jane Smith",
      role: "Employee",
      branches: ["Delhi"],
      mobile: "9876543210",
      isActive: false,
    },
  ]);

  const permissionsData: PermissionSection[] = [
    {
      heading: "Home Page",
      permissions: ["Chart View", "Chart Edit", "Chart Delete", "PO View", "PO Edit", "PO Delete"],
    },
    {
      heading: "Ac Page",
      permissions: ["View", "Edit", "Delete"],
    },
    
  ];

  const handleCheckboxChange = (userId: number, perm: string) => {
    const key = `${userId}-${perm}`;
    setCheckedPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleUserStatus = (userId: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u))
    );
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Search & Filters */}
      <div className="flex flex-wrap gap-3 mb-6 items-end text-sm">
        <input type="text" placeholder="Search Users..." className="border-[2px]   border-gray-300 rounded-lg text-black p-2 flex-1" />
        <select className="border-[2px] border-gray-300 rounded-lg p-2">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Employee</option>
        </select>
        <select className="border-[2px] border-gray-300 rounded-lg p-2">
          <option>All Branches</option>
          <option>Mumbai</option>
          <option>Ahmedabad</option>
          <option>Delhi</option>
        </select>
        <button className="bg-[#8BE497] hover:scale-95 text-black px-5 py-2 rounded-md">Search</button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto border-[2px] border-gray-300 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="font-medium">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Branches</th>
              <th className="px-4 py-2 text-left">Mobile</th>
              <th className="px-4 py-2 text-left">Permissions</th>
              <th className="px-4 py-2 text-left">Manage</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm xl:text-lg">
            {users.map((user) => (
              <>
                <tr key={user.id} className="shadow1">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">{user.branches.join(", ")}</td>
                  <td className="px-4 py-2">{user.mobile}</td>
                  <td className="px-4 py-2">
                    <button
                      className="flex items-center gap-1 px-2 py-1 border-[2px] border-gray-300 rounded-lg "
                      onClick={() =>
                        setExpandedPermissions(
                          expandedPermissions === user.id ? null : user.id
                        )
                      }
                    >
                      view {expandedPermissions === user.id ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button className="bg-[#8BE497] hover:scale-95 text-black px-3 py-1 rounded-lg">manage</button>
                  </td>
             <td className="px-4 py-2">
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={user.isActive}
      onChange={() => toggleUserStatus(user.id)}
    />
    <div className="w-8 h-6  peer-focus:outline-none  rounded-full border-[2px] border-gray-300 peer hover:scale-95  bg-red-300 peer-checked:bg-green-300 transition-all duration-300"></div>
    <span className="ml-3 text-sm font-medium text-gray-900">
      {user.isActive ? "active" : "inactive"}
    </span>
  </label>
</td>

                </tr>

                {expandedPermissions === user.id && (
                  <tr key={`perm-${user.id}`} className="bg-gray-50">
                    <td colSpan={7} className="p-4">
                      {permissionsData.map((section, idx) => (
                        <div key={idx} className="mb-3">
                          <h4 className="font-semibold mb-2">{section.heading}</h4>
                          <div className="flex flex-wrap gap-3">
                            {section.permissions.map((perm, i) => {
                              const key = `${user.id}-${perm}`;
                              return (
                                <label
                                  key={i}
                                  className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded text-sm"
                                >
                                  <input
                                    type="checkbox"
                                    checked={!!checkedPermissions[key]}
                                    onChange={() => handleCheckboxChange(user.id, perm)}
                                  />
                                  {perm}
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
