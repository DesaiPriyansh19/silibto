"use client";
import { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

interface AddEditModalProps {
  type: string;
  action: "add" | "edit";
  items?: string[]; // for dropdowns
  item?: string; // for single item like category
  onClose: () => void;
  onSave: (newItem: string) => void;
  onAddItem?: (newItem: string) => void;
  onEditItem?: (index: number, item: string) => void;
  onDeleteItem?: (index: number) => void;
}

export default function AddEditModal({
  type,
  items = [],
  item = "",
  onClose,
  onSave,
  onAddItem,
  onEditItem,
  onDeleteItem,
}: AddEditModalProps) {
  const [value, setValue] = useState(item);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleAdd = () => {
    if (value.trim()) {
      onAddItem?.(value.trim());
      setValue("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-96 max-h-[80vh] flex flex-col">
        <h2 className="text-xl font-bold mb-4">Manage {type}</h2>

        {/* Input + Add button */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border p-2 flex-1 rounded"
            placeholder={`Enter ${type}`}
          />
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-1 hover:bg-green-600"
          >
            <FaPlus /> Add
          </button>
        </div>

        {/* List of items (only for dropdowns) */}
        {items.length > 0 && (
          <ul className="overflow-y-auto flex-1 space-y-2">
            {items.map((it, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center border p-2 rounded relative"
              >
                <span>{it}</span>
                <div className="relative">
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="p-2 rounded-full hover:bg-gray-200"
                    title="Actions"
                  >
                    ⋮
                  </button>

                  {openIndex === idx && (
                    <div className="absolute right-0 top-10 bg-white border shadow-md rounded-md flex flex-col py-1 w-28 z-10">
                      <button
                        onClick={() => {
                          onEditItem?.(idx, it);
                          setOpenIndex(null);
                        }}
                        className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 text-blue-500"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => {
                          onDeleteItem?.(idx);
                          setOpenIndex(null);
                        }}
                        className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 text-red-500"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Save / Close */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => onSave(value.trim())}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
