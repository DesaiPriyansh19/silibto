"use client"
import { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

interface DropdownWithActionsProps {
  title: string;
  initialData?: string[];
  onAddItem?: () => void;
  onEditItem?: (index: number, item: string) => void;
  onDeleteItem?: (index: number, item: string) => void;
}

export default function DropdownWithActions({
  title,
  initialData = [],
  onAddItem,
  onEditItem,
  onDeleteItem
}: DropdownWithActionsProps) {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [value, setValue] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = () => {
    if (!value.trim()) return;
    const newData = [...data, value.trim()];
    setData(newData);
    onAddItem?.();
    setValue('');
  };

  const handleEditSave = (idx: number) => {
    if (!editValue.trim()) return;
    const updated = [...data];
    updated[idx] = editValue.trim();
    setData(updated);
    onEditItem?.(idx, editValue.trim());
    setEditIndex(null);
    setEditValue('');
  };

  const handleDelete = (idx: number) => {
    const deletedItem = data[idx];
    const updated = data.filter((_, i) => i !== idx);
    setData(updated);
    onDeleteItem?.(idx, deletedItem);
  };

  return (
    <div className="max-w-[90vh] mx-auto">
      <label className="block font-semibold mb-1">{title}</label>
      <div className="flex items-center gap-2">
        <select className="border-[2px] border-gray-300 rounded-lg p-2 flex-1">
          <option value="">Select {title}</option>
          {data.map((item, idx) => (
            <option key={idx} value={item}>{item}</option>
          ))}
        </select>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-gray-800"
        >
          Manage
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 flex flex-col max-h-[80vh]">
            <h2 className="text-xl font-bold mb-4">Manage {title}</h2>

            {/* Input + Add */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={`Enter ${title}`}
                className="border p-2 flex-1 rounded"
              />
              <button
                onClick={handleAdd}
                className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-1"
              >
                <FaPlus /> Add
              </button>
            </div>

            {/* List */}
            <ul className="overflow-y-auto flex-1 space-y-2">
              {data.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center border p-2 rounded relative">
                  {editIndex === idx ? (
                    <div className="flex flex-1 gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="border p-1 rounded flex-1"
                      />
                      <button
                        onClick={() => handleEditSave(idx)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <span>{item}</span>
                  )}

                  {editIndex !== idx && (
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
                            onClick={() => { setEditIndex(idx); setEditValue(item); setOpenIndex(null); }}
                            className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 text-blue-500"
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            onClick={() => { handleDelete(idx); setOpenIndex(null); }}
                            className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 text-red-500"
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
