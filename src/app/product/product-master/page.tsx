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
  FiLoader,
  FiSearch,
} from "react-icons/fi";

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

export default function ProductMaster() {
  const { token } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // category modal
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [currentCategoryName, setCurrentCategoryName] = useState("");
  const [categoryAction, setCategoryAction] = useState<"add" | "edit" | null>(null);

  // dropdown modal
  const [dropdownModalOpen, setDropdownModalOpen] = useState(false);
  const [dropdownInputValue, setDropdownInputValue] = useState("");
  const [dropdownAction, setDropdownAction] = useState<
    "add-sub" | "edit-sub" | "add-option" | "edit-option" | null
  >(null);
  const [activeGroup, setActiveGroup] = useState<DropdownGroup | null>(null);
  const [activeOption, setActiveOption] = useState<Option | null>(null);

  // ---------------- Fetch Categories ----------------
  const fetchCategories = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-master`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCategories(data.docs || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch categories");
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [token]);

  // ---------------- Category Handlers ----------------
  const toggleCategoryExpand = (cat: Category) => {
    setSelectedCategory(cat);
    setExpandedCategoryIds((prev) =>
      prev.includes(cat.id)
        ? prev.filter((id) => id !== cat.id)
        : [...prev, cat.id]
    );
  };

  const saveCategory = async () => {
    if (!currentCategoryName.trim()) return toast.error("Category name required");
    setLoading(true);
    try {
      if (categoryAction === "add") {
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-master`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            categoryName: currentCategoryName,
            dropdownGroups: [],
          }),
        });
        toast.success("Category added");
      } else if (categoryAction === "edit" && selectedCategory) {
        await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-master/${selectedCategory.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ categoryName: currentCategoryName }),
          }
        );
        toast.success("Category updated");
      }
      await fetchCategories();
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
    setLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-master/${catId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Category deleted");
      await fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error("Error deleting category");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Subcategory / Option Handlers ----------------
  const openDropdownModal = (
    action: "add-sub" | "edit-sub" | "add-option" | "edit-option",
    cat?: Category,
    group?: DropdownGroup,
    option?: Option
  ) => {
    if (cat) setSelectedCategory(cat);
    setActiveGroup(group || null);
    setActiveOption(option || null);
    setDropdownAction(action);
    if (action === "edit-sub") setDropdownInputValue(group?.dropdownName || "");
    else if (action === "edit-option") setDropdownInputValue(option?.value || "");
    else setDropdownInputValue("");
    setDropdownModalOpen(true);
  };

  const saveDropdownChange = async () => {
    if (!selectedCategory) return toast.error("No category selected");
    if (!dropdownInputValue.trim()) return toast.error("Value cannot be empty");

    setLoading(true);
    try {
      let updatedGroups = [...selectedCategory.dropdownGroups];

      if (dropdownAction === "add-sub") {
        updatedGroups.push({
          dropdownName: dropdownInputValue,
          options: [],
          id: crypto.randomUUID(),
        });
      } else if (dropdownAction === "edit-sub" && activeGroup) {
        updatedGroups = updatedGroups.map((g) =>
          g.id === activeGroup.id ? { ...g, dropdownName: dropdownInputValue } : g
        );
      } else if (dropdownAction === "add-option" && activeGroup) {
        updatedGroups = updatedGroups.map((g) =>
          g.id === activeGroup.id
            ? {
                ...g,
                options: [
                  ...g.options,
                  { value: dropdownInputValue, id: crypto.randomUUID() },
                ],
              }
            : g
        );
      } else if (dropdownAction === "edit-option" && activeGroup && activeOption) {
        updatedGroups = updatedGroups.map((g) =>
          g.id === activeGroup.id
            ? {
                ...g,
                options: g.options.map((o) =>
                  o.id === activeOption.id ? { ...o, value: dropdownInputValue } : o
                ),
              }
            : g
        );
      }

      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-master/${selectedCategory.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ dropdownGroups: updatedGroups }),
        }
      );
      toast.success("Saved successfully");
      await fetchCategories();
      setDropdownModalOpen(false);
      setDropdownInputValue("");
      setActiveGroup(null);
      setActiveOption(null);
      setDropdownAction(null);
    } catch (err) {
      console.error(err);
      toast.error("Error saving changes");
    } finally {
      setLoading(false);
    }
  };

  const deleteSubcategory = async (cat: Category, groupId: string) => {
    if (!confirm("Delete this subcategory?")) return;
    setLoading(true);
    try {
      const updatedGroups = cat.dropdownGroups.filter((g) => g.id !== groupId);
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-master/${cat.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dropdownGroups: updatedGroups }),
      });
      toast.success("Subcategory deleted");
      await fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error("Error deleting subcategory");
    } finally {
      setLoading(false);
    }
  };

  const deleteOption = async (cat: Category, groupId: string, optionId: string) => {
    if (!confirm("Delete this option?")) return;
    setLoading(true);
    try {
      const updatedGroups = cat.dropdownGroups.map((g) =>
        g.id === groupId ? { ...g, options: g.options.filter((o) => o.id !== optionId) } : g
      );
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-master/${cat.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dropdownGroups: updatedGroups }),
      });
      toast.success("Option deleted");
      await fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error("Error deleting option");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Render ----------------
  if (initialLoading) {
    return (
      <div className="p-6 w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Product Master</h1>
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  // Filter options based on search term
  const filteredCategories = categories.map((cat) => ({
    ...cat,
    dropdownGroups: cat.dropdownGroups.map((group) => ({
      ...group,
      options: group.options.filter((opt) =>
        opt.value.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    })),
  }));

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Master</h1>

      {/* Search + Add */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center border rounded-lg px-3 py-2 w-72 bg-white">
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search options..."
            className="outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className="bg-[#5DD86E] text-black px-4 py-2 rounded-lg hover:scale-95 flex items-center gap-1"
          onClick={() => {
            setCategoryAction("add");
            setCurrentCategoryName("");
            setCategoryModalOpen(true);
          }}
        >
          <FiPlus /> Add Category
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        {filteredCategories.map((cat) => (
          <div key={cat.id} className="border-2 border-gray-300 p-3 rounded-xl bg-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-center">
                <button onClick={() => toggleCategoryExpand(cat)} className="text-4xl">
                  {expandedCategoryIds.includes(cat.id) ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <h2 className="font-semibold">{cat.categoryName}</h2>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() => {
                    setCategoryAction("edit");
                    setCurrentCategoryName(cat.categoryName);
                    setSelectedCategory(cat);
                    setCategoryModalOpen(true);
                  }}
                  className="text-white text-lg font-extrabold bg-black rounded-xl p-1"
                >
                  <FiEdit />
                </button>

                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="text-white text-lg font-extrabold bg-black rounded-xl p-1"
                >
                  <FiTrash2 />
                </button>

                <button
                  onClick={() => openDropdownModal("add-sub", cat)}
                  className="text-white text-lg font-extrabold bg-black rounded-xl p-1"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Subcategories */}
            {expandedCategoryIds.includes(cat.id) && (
              <div className="pl-4 mt-3 space-y-3">
                {cat.dropdownGroups.map((group) => (
                  <div key={group.id} className="border border-gray-300 p-3 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{group.dropdownName}</h3>
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => openDropdownModal("add-option", cat, group)}
                          className="text-black hover:text-blue-700 text-lg font-extrabold rounded-xl p-1 hover:scale-110"
                        >
                          <FiPlus />
                        </button>
                        <button
                          onClick={() => openDropdownModal("edit-sub", cat, group)}
                          className="text-black hover:text-blue-700 text-lg font-extrabold rounded-xl p-1 hover:scale-110"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => deleteSubcategory(cat, group.id)}
                          className="text-black hover:text-red-700 text-lg font-extrabold rounded-xl p-1 hover:scale-110"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.options.map((opt) => (
                        <div
                          key={opt.id}
                          className="flex items-center gap-1 border border-gray-200 rounded-xl px-2 py-1"
                        >
                          {opt.value}
                          <button onClick={() => openDropdownModal("edit-option", cat, group, opt)}>
                            <FiEdit className="text-black hover:text-blue-700 text-sm" />
                          </button>
                          <button onClick={() => deleteOption(cat, group.id, opt.id)}>
                            <FiTrash2 className="text-black hover:text-red-700 text-sm" />
                          </button>
                        </div>
                      ))}
                      {group.options.length === 0 && (
                        <p className="text-gray-400 text-sm">oops! No options match your search.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modals */}
      {categoryModalOpen && (
        <Modal
          title={categoryAction === "add" ? "Add Category" : "Edit Category"}
          value={currentCategoryName}
          onChange={setCurrentCategoryName}
          onClose={() => setCategoryModalOpen(false)}
          onSave={saveCategory}
          loading={loading}
        />
      )}

      {dropdownModalOpen && (
        <Modal
          title={
            dropdownAction === "add-sub"
              ? "Add Subcategory"
              : dropdownAction === "edit-sub"
              ? "Edit Subcategory"
              : dropdownAction === "add-option"
              ? "Add Option"
              : "Edit Option"
          }
          value={dropdownInputValue}
          onChange={setDropdownInputValue}
          onClose={() => {
            setDropdownModalOpen(false);
            setActiveGroup(null);
            setActiveOption(null);
            setDropdownAction(null);
          }}
          onSave={saveDropdownChange}
          loading={loading}
        />
      )}
    </div>
  );
}

// ---------------- Modal ----------------
const Modal = ({
  title,
  value,
  onChange,
  onClose,
  onSave,
  loading,
}: {
  title: string;
  value: string;
  onChange: (v: string) => void;
  onClose: () => void;
  onSave: () => void;
  loading: boolean;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white p-6 rounded w-96">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <input
        type="text"
        className="border p-2 w-full mb-4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <button className="bg-gray-300 px-3 py-1 rounded" onClick={onClose}>
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={loading}
          className={`bg-green-500 text-white px-3 py-1 rounded flex items-center gap-2 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading && <FiLoader className="animate-spin" />}
          {loading ? "Processing..." : "Save"}
        </button>
      </div>
    </div>
  </div>
);
