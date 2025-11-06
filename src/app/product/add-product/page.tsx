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
  isMultiSelect?: boolean;
}

interface Category {
  id: string;
  categoryName: string;
  dropdownGroups: DropdownGroup[];
}

interface Branch {
  id: string;
  name: string;
}

type AttributeValue = string | string[];

export default function AddProductPage() {
  const { token, user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [categories, setCategories] = useState<Category[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loadingBranches, setLoadingBranches] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, AttributeValue>>({});
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [openingStock, setOpeningStock] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");

  const [loading, setLoading] = useState(false);

  // -------------------- Fetch categories --------------------
  useEffect(() => {
    if (!token) return;
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-master?depth=2`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        setCategories(data.docs || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, [token]);

  // -------------------- Fetch branches --------------------
  useEffect(() => {
    if (!token || !user?.brand?.id) return;

    const fetchBranches = async () => {
      setLoadingBranches(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/branches?where[brand][equals]=${user.brand.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        const fetchedBranches = data.docs || [];
        setBranches(fetchedBranches);

        // Non-admin users → auto-select their assigned branch
        if (!isAdmin) {
          if (user.branches && user.branches.length > 0) {
            setSelectedBranch(user.branches[0].id);
          } else if (fetchedBranches.length === 1) {
            setSelectedBranch(fetchedBranches[0].id);
          }
        }

        // Admins → keep selectedBranch empty until they choose
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch branches");
      } finally {
        setLoadingBranches(false);
      }
    };

    fetchBranches();
  }, [token, user, isAdmin]);

  // -------------------- Handlers --------------------
  const handleCategoryChange = (catId: string) => {
    const cat = categories.find((c) => c.id === catId) || null;
    setSelectedCategory(cat);
    setSelectedOptions({});
  };

  const handleSelectChange = (groupName: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [groupName]: value }));
  };

  const handleCheckboxChange = (groupName: string, value: string, checked: boolean) => {
    setSelectedOptions((prev) => {
      const current = prev[groupName];
      const arr = Array.isArray(current) ? [...current] : [];
      if (checked) {
        if (!arr.includes(value)) arr.push(value);
      } else {
        const idx = arr.indexOf(value);
        if (idx > -1) arr.splice(idx, 1);
      }
      return { ...prev, [groupName]: arr };
    });
  };

  // -------------------- Submit --------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory) return toast.error("Select a category first");
    if (!productName.trim()) return toast.error("Product name required");
    if (!price.trim()) return toast.error("Price required");
    if (!selectedBranch) return toast.error("Branch not assigned");

    // Prepare attributes
    const attributes: Record<string, any> = {};
    selectedCategory.dropdownGroups.forEach((group) => {
      const key = group.dropdownName;
      const val = selectedOptions[key];
      if (group.isMultiSelect) {
        attributes[key] = Array.isArray(val) ? val : val ? [val] : [];
      } else {
        attributes[key] = typeof val === "string" ? val : "";
      }
    });

    const productData = {
      productName,
      price: Number(price),
      openingStock: Number(openingStock),
      category: selectedCategory.id,
      attributes,
      branch: selectedBranch,
      brand: user?.brand?.id,
    };

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error(await res.text());

      toast.success("✅ Product added successfully!");
      setProductName("");
      setPrice("");
      setOpeningStock("");
      setSelectedCategory(null);
      setSelectedOptions({});
      if (isAdmin) setSelectedBranch("");
    } catch (err) {
      console.error(err);
      toast.error("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Render --------------------
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="rounded-2xl w-full max-w-5xl p-8 md:p-10">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* Category */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">Select Category</label>
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
              <label className="block font-medium text-gray-700 mb-2">Product Name</label>
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
              <label className="block font-medium text-gray-700 mb-2">Price (₹)</label>
              <input
                type="number"
                className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                required
              />
            </div>

            {/* Branch Select only for Admin */}
            {isAdmin && !loadingBranches && branches.length > 0 && (
              <div>
                <label className="block font-medium text-gray-700 mb-2">Select Branch</label>
                <select
                  className="border text-black border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  required
                >
                  <option value="">Select Branch</option>
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Opening Stock */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">Opening Stock</label>
              <input
                type="number"
                className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
                value={openingStock}
                onChange={(e) => setOpeningStock(e.target.value)}
                placeholder="Enter opening stock"
                required
              />
            </div>
          </div>

          {/* RIGHT SIDE - Dynamic Dropdowns */}
          <div className="space-y-6">
            {selectedCategory && selectedCategory.dropdownGroups.length > 0 ? (
              selectedCategory.dropdownGroups.map((group) => (
                <div key={group.id}>
                  <label className="block font-medium text-gray-700 mb-2">
                    {group.dropdownName}
                    {group.isMultiSelect && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        Multi
                      </span>
                    )}
                  </label>

                  {group.isMultiSelect ? (
                    <div className="flex flex-wrap gap-3">
                      {group.options.map((opt) => {
                        const currentValues = Array.isArray(selectedOptions[group.dropdownName])
                          ? selectedOptions[group.dropdownName]
                          : [];
                        const checked = currentValues.includes(opt.value);
                        return (
                          <label key={opt.id} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) =>
                                handleCheckboxChange(group.dropdownName, opt.value, e.target.checked)
                              }
                            />
                            <span>{opt.value}</span>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    <select
                      className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
                      value={(selectedOptions[group.dropdownName] as string) || ""}
                      onChange={(e) => handleSelectChange(group.dropdownName, e.target.value)}
                      required
                    >
                      <option value="">Select {group.dropdownName}</option>
                      {group.options.map((opt) => (
                        <option key={opt.id} value={opt.value}>
                          {opt.value}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-lg italic">Select a category to load options</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-lg transition-all shadow-md disabled:opacity-60"
            >
              {loading ? "Saving..." : "+ Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
