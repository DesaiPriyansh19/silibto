"use client";
import React, { useState } from "react";
import DropdownWithActions from "../../../components/DropdownWithActions";
import AddEditModal from "../../../components/AddEditModal";
import { FaListUl } from "react-icons/fa";

type DropdownKeys = "brand" | "product" | "modality" | "unitQty" | "type";

interface CurrentEdit {
  type: DropdownKeys;
  item?: string;
}

function ProductMaster() {
  // ---------------- Category State ----------------
  const [categories, setCategories] = useState([
    "Contact Lens Frame",
    "Solution",
    "Spectacles Lenses",
    "SunGlass",
  ]);
  const [category, setCategory] = useState("");
  const [mainCategoryModal, setMainCategoryModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const [categoryAction, setCategoryAction] = useState<"add" | "edit" | null>(
    null
  );

  // ---------------- Dropdown State ----------------
  const [dropdownData, setDropdownData] = useState<Record<DropdownKeys, string[]>>({
    brand: [],
    product: [],
    modality: [],
    unitQty: [],
    type: [],
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState<CurrentEdit | null>(null);
  const [actionType, setActionType] = useState<"add" | "edit" | null>(null);

  // ---------------- Handlers ----------------
  const handleDropdownSave = (newItem: string) => {
    if (!currentEdit || !actionType) return;

    setDropdownData((prev) => {
      const updated = { ...prev };
      const key = currentEdit.type;

      if (actionType === "add") {
        updated[key] = [...updated[key], newItem];
      } else {
        updated[key] = updated[key].map((i) => (i === currentEdit.item ? newItem : i));
      }
      return updated;
    });

    setModalOpen(false);
    setCurrentEdit(null);
    setActionType(null);
  };

  const handleCategorySave = (newCategory: string) => {
    if (!categoryAction) return;

    setCategories((prev) => {
      if (categoryAction === "add") return [...prev, newCategory];
      return prev.map((c) => (c === currentCategory ? newCategory : c));
    });

    setCategoryModalOpen(false);
    setCurrentCategory("");
    setCategoryAction(null);
  };

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  return (
    <div className="p-6 h-full w-full">
      <h1 className="text-3xl font-bold mb-4 text-center">Product Master</h1>

      {/* ---------------- Category Selection ---------------- */}
      <div className="flex flex-col items-center justify-center mb-6">
        <label className="mb-2 font-semibold">Select Category</label>
        <div className="flex gap-2">
          <select
            className="border-[2px] rounded-lg p-2 border-gray-300"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button
            className="text-black text-xl lg:text-2xl px-2 hover:scale-95 transition-all"
            onClick={() => setMainCategoryModal(true)}
            title="Manage Categories"
          >
            <FaListUl />
          </button>
        </div>
      </div>

      {/* ---------------- Manage Categories Modal ---------------- */}
      {mainCategoryModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-start pt-5 bg-black/40">
          <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
            <div className="flex justify-end">
              <button
                className="text-3xl hover:scale-90"
                onClick={() => setMainCategoryModal(false)}
              >
                x
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4">Manage Categories</h2>

            {/* Add Category */}
            <div className="flex mb-4 gap-2">
              <input
                type="text"
                className="border p-2 flex-1"
                placeholder="New Category"
                value={currentCategory}
                onChange={(e) => setCurrentCategory(e.target.value)}
              />
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => {
                  if (currentCategory.trim() && !categories.includes(currentCategory.trim())) {
                    setCategories((prev) => [...prev, currentCategory.trim()]);
                    setCurrentCategory("");
                  }
                }}
              >
                Add
              </button>
            </div>

            {/* Category List */}
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {categories.map((cat) => (
                <li key={cat} className="flex justify-between items-center border p-2 rounded">
                  {cat}
                  <div className="flex gap-2">
                    <button
                      className="text-blue-500"
                      onClick={() => {
                        setCurrentCategory(cat);
                        setCategoryAction("edit");
                        setCategoryModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete ${cat}?`)) {
                          setCategories((prev) => prev.filter((c) => c !== cat));
                          if (category === cat) setCategory("");
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ---------------- Dropdowns ---------------- */}
      {category && (
        <div className="space-y-4">
          {(Object.keys(dropdownData) as DropdownKeys[]).map((key) => (
            <DropdownWithActions
              key={key}
              title={key}
              initialData={dropdownData[key]}
              onAddItem={() => {
                setActionType("add");
                setCurrentEdit({ type: key });
                setModalOpen(true);
              }}
              onEditItem={(idx, item) => {
                setActionType("edit");
                setCurrentEdit({ type: key, item });
                setModalOpen(true);
              }}
              onDeleteItem={(idx, item) => {
                if (confirm(`Are you sure you want to delete ${item}?`)) {
                  setDropdownData((prev) => ({
                    ...prev,
                    [key]: prev[key].filter((i) => i !== item),
                  }));
                }
              }}
            />
          ))}
        </div>
      )}

      {/* ---------------- Add/Edit Dropdown Modal ---------------- */}
      {modalOpen && actionType && currentEdit && (
        <AddEditModal
          type={currentEdit.type}
          action={actionType}
          items={dropdownData[currentEdit.type] || []}
          item={currentEdit.item || ""}
          onClose={() => setModalOpen(false)}
          onSave={handleDropdownSave}
        />
      )}

      {/* ---------------- Add/Edit Category Modal ---------------- */}
      {categoryModalOpen && categoryAction && (
        <AddEditModal
          type="Category"
          action={categoryAction}
          item={currentCategory}
          onClose={() => setCategoryModalOpen(false)}
          onSave={handleCategorySave}
        />
      )}
    </div>
  );
}

export default ProductMaster;
