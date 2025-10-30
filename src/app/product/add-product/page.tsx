"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

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

export default function AddProductPage() {
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  // Fetch categories
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

  const handleCategoryChange = (catId: string) => {
    const cat = categories.find((c) => c.id === catId) || null;
    setSelectedCategory(cat);
    setSelectedOptions({});
  };

  const handleOptionChange = (groupName: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [groupName]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return toast.error("Select a category first");

    const productData = {
      productName,
      price,
      categoryId: selectedCategory.id,
      attributes: selectedOptions,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error("Failed to add product");

      toast.success("Product added successfully!");
      setProductName("");
      setPrice("");
      setSelectedCategory(null);
      setSelectedOptions({});
    } catch (err) {
      console.error(err);
      toast.error("Error adding product");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="  rounded-2xl w-full max-w-5xl p-8 md:p-10">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side */}
          <div className="space-y-6">
                     {/* Category Select */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Select Category
              </label>
              <select
                className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
                value={selectedCategory?.id || ""}
                onChange={(e) => handleCategoryChange(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>
            {/* Product Name */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                required
              />
            </div>

   
          </div>

          {/* Right Side - Dynamic Dropdowns */}
          <div className="space-y-6">
            {selectedCategory && selectedCategory.dropdownGroups.length > 0 ? (
              selectedCategory.dropdownGroups.map((group) => (
                <div key={group.id}>
                  <label className="block font-medium text-gray-700 mb-2">
                    {group.dropdownName}
                  </label>
                  <select
                    className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
                    value={selectedOptions[group.dropdownName] || ""}
                    onChange={(e) => handleOptionChange(group.dropdownName, e.target.value)}
                    required
                  >
                    <option value="">Select {group.dropdownName}</option>
                    {group.options.map((opt) => (
                      <option key={opt.id} value={opt.value}>
                        {opt.value}
                      </option>
                    ))}
                  </select>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm italic mt-4">
                Select a category to load options
              </p>
            )}
          </div>

          {/* Full-width Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-md"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
