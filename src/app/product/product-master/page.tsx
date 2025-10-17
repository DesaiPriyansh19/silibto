"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

// ---------------- Types ----------------
interface Option {
  value: string;
  id: string;
}

interface DropdownGroup {
  dropdownName: string;
  options: Option[];
  id: string;
}

interface Category {
  id: string;
  categoryName: string;
  dropdownGroups: DropdownGroup[];
}

// ---------------- Component ----------------
export default function ProductMaster() {
  const { token } = useAuth();

  // Categories
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Modal & Input States
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [currentCategoryName, setCurrentCategoryName] = useState("");
  const [categoryAction, setCategoryAction] = useState<"add" | "edit" | null>(null);

  const [dropdownModalOpen, setDropdownModalOpen] = useState(false);
  const [currentDropdown, setCurrentDropdown] = useState<{ groupName: string; optionValue?: string } | null>(null);
  const [dropdownAction, setDropdownAction] = useState<"add" | "edit" | null>(null);
  const [dropdownInputValue, setDropdownInputValue] = useState("");

  // Loading states
  const [loading, setLoading] = useState(false);
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<string[]>([]);

  // ---------------- Fetch Categories ----------------
  useEffect(() => {
    if (!token) return;

    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-master`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCategories(data.docs || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, [token]);

  // ---------------- Handlers ----------------
  const handleSelectCategory = (catId: string) => {
    const cat = categories.find((c) => c.id === catId) || null;
    setSelectedCategory(cat);
  };

  // Expand/Collapse
  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategoryIds((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  // Add/Edit/Delete Category
  const saveCategory = async () => {
    if (!currentCategoryName.trim()) return toast.error("Category name required");
    setLoading(true);
    try {
      let updatedCategories: Category[] = [];

      if (categoryAction === "add") {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-master`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ categoryName: currentCategoryName, dropdownGroups: [] }),
        });
        const newCat = await res.json();
        updatedCategories = [...categories, newCat];
        toast.success("Category added");
      } else if (categoryAction === "edit" && selectedCategory) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-master/${selectedCategory.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ categoryName: currentCategoryName }),
        });
        const updatedCat = await res.json();
        updatedCategories = categories.map((c) => (c.id === updatedCat.id ? updatedCat : c));
        toast.success("Category updated");
      }

      setCategories(updatedCategories);
      setCategoryModalOpen(false);
      setCurrentCategoryName("");
      setCategoryAction(null);
    } catch (err) {
      console.error(err);
      toast.error("Error saving category");
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (catId: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-master/${catId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(categories.filter((c) => c.id !== catId));
      if (selectedCategory?.id === catId) setSelectedCategory(null);
      toast.success("Category deleted");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting category");
    }
  };

  // Dropdown Option Handlers
  const saveDropdownOption = async () => {
    if (!selectedCategory || !currentDropdown || !dropdownInputValue.trim()) return;
    setLoading(true);
    try {
      const updatedGroups = selectedCategory.dropdownGroups.map((group) => {
        if (group.dropdownName !== currentDropdown.groupName) return group;

        if (dropdownAction === "add") {
          group.options.push({ value: dropdownInputValue, id: crypto.randomUUID() });
        } else if (dropdownAction === "edit" && currentDropdown.optionValue) {
          group.options = group.options.map((opt) =>
            opt.value === currentDropdown.optionValue ? { ...opt, value: dropdownInputValue } : opt
          );
        }

        return group;
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-master/${selectedCategory.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ dropdownGroups: updatedGroups }),
      });
      const updatedCategory = await res.json();

      setCategories(categories.map((c) => (c.id === updatedCategory.id ? updatedCategory : c)));
      setSelectedCategory(updatedCategory);

      setDropdownModalOpen(false);
      setDropdownInputValue("");
      setDropdownAction(null);
      setCurrentDropdown(null);
      toast.success("Dropdown updated");
    } catch (err) {
      console.error(err);
      toast.error("Error updating dropdown");
    } finally {
      setLoading(false);
    }
  };

  const deleteDropdownOption = async (groupName: string, optionValue: string) => {
    if (!selectedCategory) return;
    if (!confirm("Are you sure to delete this option?")) return;
    setLoading(true);
    try {
      const updatedGroups = selectedCategory.dropdownGroups.map((group) => {
        if (group.dropdownName !== groupName) return group;
        group.options = group.options.filter((opt) => opt.value !== optionValue);
        return group;
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-master/${selectedCategory.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ dropdownGroups: updatedGroups }),
      });

      const updatedCategory = await res.json();
      setCategories(categories.map((c) => (c.id === updatedCategory.id ? updatedCategory : c)));
      setSelectedCategory(updatedCategory);
      toast.success("Option deleted");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting option");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Render ----------------
  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Master</h1>

      {/* Category Select & Add */}
      <div className="flex items-center gap-2 mb-6">
        <select
          className="border p-2 rounded-lg"
          value={selectedCategory?.id || ""}
          onChange={(e) => handleSelectCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.categoryName}
            </option>
          ))}
        </select>

        <button
          className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1"
          onClick={() => {
            setCategoryAction("add");
            setCurrentCategoryName("");
            setCategoryModalOpen(true);
          }}
        >
          <FiPlus /> Add Category
        </button>
      </div>

      {/* Categories List */}
      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat.id} className="border-[2px] border-gray-300 p-3 rounded ">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">{cat.categoryName}</h2>
              <div className="flex gap-2 items-center">
                <button onClick={() => { setCategoryAction("edit"); setCurrentCategoryName(cat.categoryName); setSelectedCategory(cat); setCategoryModalOpen(true); }} title="Edit">
                  <FiEdit className="text-blue-500 hover:text-blue-700" />
                </button>
                <button onClick={() => deleteCategory(cat.id)} title="Delete">
                  <FiTrash2 className="text-red-500 hover:text-red-700" />
                </button>
                <button onClick={() => toggleCategoryExpand(cat.id)} title="Expand/Collapse">
                  {expandedCategoryIds.includes(cat.id) ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
            </div>

            {/* Dropdown Groups */}
            {expandedCategoryIds.includes(cat.id) && (
              <div className="pl-4 mt-3  bg-white rounded-lg space-y-3 transition-all duration-300">
                {cat.dropdownGroups.map((group) => (
                  <div key={group.id} className="border-[2px] border-gray-300 p-3 rounded">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{group.dropdownName}</h3>
                      <button
                        className="flex items-center gap-1 text-green-500 hover:text-green-700"
                        onClick={() => { setDropdownAction("add"); setCurrentDropdown({ groupName: group.dropdownName }); setDropdownInputValue(""); setDropdownModalOpen(true); }}
                      >
                        <FiPlus /> Add Option
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.options.map((opt) => (
                        <div key={opt.id} className="flex items-center gap-1 border-[2px] border-gray-300 rounded px-2 py-1">
                          {opt.value}
                          <button className="text-blue-500 hover:text-blue-700 text-sm" onClick={() => { setDropdownAction("edit"); setCurrentDropdown({ groupName: group.dropdownName, optionValue: opt.value }); setDropdownInputValue(opt.value); setDropdownModalOpen(true); }} title="Edit">
                            <FiEdit />
                          </button>
                          <button className="text-red-500 hover:text-red-700 text-sm" onClick={() => deleteDropdownOption(group.dropdownName, opt.value)} title="Delete">
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Category Modal */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">{categoryAction === "add" ? "Add Category" : "Edit Category"}</h2>
            <input
              type="text"
              className="border p-2 w-full mb-4"
              value={currentCategoryName}
              onChange={(e) => setCurrentCategoryName(e.target.value)}
              placeholder="Category Name"
            />
            <div className="flex justify-end gap-2">
              <button className="bg-gray-300 px-3 py-1 rounded" onClick={() => setCategoryModalOpen(false)}>Cancel</button>
              <button
                onClick={saveCategory}
                disabled={loading}
                className={`bg-green-500 text-white px-3 py-1 rounded flex items-center gap-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dropdown Modal */}
      {dropdownModalOpen && currentDropdown && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">
              {dropdownAction === "add" ? `Add Option to ${currentDropdown.groupName}` : "Edit Option"}
            </h2>
            <input
              type="text"
              className="border p-2 w-full mb-4"
              value={dropdownInputValue}
              onChange={(e) => setDropdownInputValue(e.target.value)}
              placeholder="Option Value"
            />
            <div className="flex justify-end gap-2">
              <button className="bg-gray-300 px-3 py-1 rounded" onClick={() => setDropdownModalOpen(false)}>Cancel</button>
              <button
                onClick={saveDropdownOption}
                disabled={loading}
                className={`bg-green-500 text-white px-3 py-1 rounded flex items-center gap-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
