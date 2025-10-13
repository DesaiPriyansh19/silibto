"use client";

import { useState } from "react";

type PermissionSection = {
  id: number;
  heading: string;
  permissions: string[];
};

export default function PermissionManagement() {
  const [searchText, setSearchText] = useState("");
  const [sections, setSections] = useState<PermissionSection[]>([
    { id: 1, heading: "Home Page", permissions: ["Chart View", "Chart Edit", "Chart Delete"] },
    { id: 2, heading: "Ac Page", permissions: ["View", "Edit", "Delete"] },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newHeading, setNewHeading] = useState("");
  const [newPermissions, setNewPermissions] = useState<string[]>([""]);

  // Store which permissions are checked per section
  const [checkedPermissions, setCheckedPermissions] = useState<{ [key: string]: boolean }>({});

  // Add new input field for permission
  const addPermissionField = () => setNewPermissions((prev) => [...prev, ""]);

  const handlePermissionChange = (index: number, value: string) => {
    setNewPermissions((prev) => prev.map((p, i) => (i === index ? value : p)));
  };

  const removePermissionField = (index: number) => {
    setNewPermissions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddSection = () => {
    if (!newHeading || newPermissions.filter((p) => p.trim() !== "").length === 0) return;

    const newSection: PermissionSection = {
      id: Date.now(),
      heading: newHeading,
      permissions: newPermissions.filter((p) => p.trim() !== ""),
    };

    setSections((prev) => [...prev, newSection]);
    setNewHeading("");
    setNewPermissions([""]);
    setShowForm(false);
  };

  const togglePermission = (sectionId: number, perm: string) => {
    const key = `${sectionId}-${perm}`;
    setCheckedPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredSections = sections.filter((s) =>
    s.heading.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search */}
      <div className="flex gap-3 mb-6 text-sm xl:text-lg">
        <input
          type="text"
          placeholder="Search Permissions..."
          className="border-[2px] border-gray-300 rounded-lg p-2 flex-1"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:scale-95">Search</button>
             {/* Add New Permission Button */}
      <div className="">
        <button
          className="bg-black text-white px-4 py-2 rounded hover:scale-95"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "+ Add New Permission "}
        </button>
      </div>
      </div>

 

      {/* Add Permission Form */}
      {showForm && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <input
            type="text"
            placeholder="Heading"
            className="border rounded p-2 w-full mb-3"
            value={newHeading}
            onChange={(e) => setNewHeading(e.target.value)}
          />

          <div className="mb-3">
            <h4 className="font-semibold mb-2">Permissions</h4>
            {newPermissions.map((perm, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder={`Permission ${index + 1}`}
                  className="border rounded p-2 flex-1"
                  value={perm}
                  onChange={(e) => handlePermissionChange(index, e.target.value)}
                />
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => removePermissionField(index)}
                  type="button"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={addPermissionField}
              type="button"
            >
              Add Permission Field
            </button>
          </div>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleAddSection}
            type="button"
          >
            Add Permission Section
          </button>
        </div>
      )}

      {/* Permissions List */}
      <div>
        {filteredSections.map((section) => (
          <div key={section.id} className="bg-white p-4 rounded shadow mb-4">
            <h4 className="font-semibold mb-2">{section.heading}</h4>
            <div className="flex flex-wrap gap-2">
              {section.permissions.map((perm) => {
                const key = `${section.id}-${perm}`;
                return (
                  <label
                    key={perm}
                    className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={!!checkedPermissions[key]}
                      onChange={() => togglePermission(section.id, perm)}
                    />
                    {perm}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
