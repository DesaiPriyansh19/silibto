"use client";

import React, { useEffect, useState, useMemo } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

interface Category {
  id: string;
  categoryName: string; // updated
}

interface Product {
  id: string;
  productName: string;
  openingStock?: number;
  category?: Category | string;
}

interface InventoryItem {
  id: string;
  product: Product | string;
  currentStock: number;
  lastUpdated: string;
  purchasedQty?: number;
  soldQty?: number;
}

export default function InventoryList() {
  const { token, user } = useAuth();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchInventory();
      fetchCategories();
    }
  }, [token, user]);

  // Fetch inventory
  const fetchInventory = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/inventory?depth=2&limit=1000`,
        {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) setInventory(data?.docs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all categories for filter
  const fetchCategories = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-master?limit=1000`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setCategories(data?.docs || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered inventory with search and category
  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const product =
        typeof item.product === "object"
          ? item.product
          : { productName: item.product, openingStock: 0, category: "" };

      const productName = product.productName?.toLowerCase() || "";

      // Resolve category name
      let categoryName = "";
      if (typeof product.category === "object" && product.category?.categoryName) {
        categoryName = product.category.categoryName.toLowerCase();
      } else if (typeof product.category === "string") {
        const cat = categories.find((c) => c.id === product.category);
        if (cat) categoryName = (cat as Category).categoryName.toLowerCase();
      }

      const matchesSearch =
        productName.includes(search.toLowerCase()) ||
        categoryName.includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || categoryName === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [inventory, search, selectedCategory, categories]);

  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    await fetchInventory();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="p-2 md:p-6 min-h-screen">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Inventory</h2>

      {/* Search + Category Filter + Refresh */}
      <div className="flex flex-wrap gap-3 mb-6 items-end text-sm">
        <input
          type="text"
          placeholder="Search product or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-[2px] border-gray-300 rounded-lg text-black p-2 flex-1"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border-[2px] border-gray-300 rounded-lg p-2 text-black"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.categoryName}>
              {cat.categoryName}
            </option>
          ))}
        </select>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg transition-transform duration-200 ${
            isRefreshing ? "opacity-70 cursor-not-allowed" : "hover:scale-95"
          }`}
        >
          <FiRefreshCcw
            className={`text-lg transition-transform duration-500 ease-in-out ${
              isRefreshing ? "rotate-[720deg]" : "rotate-0"
            }`}
          />
          <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
        </button>
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-auto border-[2px] border-gray-300 bg-white rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="font-medium text-sm md:text-base">
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Opening Stock</th>
              <th className="px-4 py-2 text-left">Purchased</th>
              <th className="px-4 py-2 text-left">Sold</th>
              <th className="px-4 py-2 text-left">Current Stock</th>
              <th className="px-4 py-2 text-left">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm xl:text-lg">
            {loading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    {Array.from({ length: 7 }).map((__, colIdx) => (
                      <td key={colIdx} className="px-4 py-3">
                        <div className="relative overflow-hidden rounded-md bg-gray-200 h-5 w-full">
                          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))
              : filteredInventory.length > 0
              ? filteredInventory.map((item) => {
                  const product =
                    typeof item.product === "object"
                      ? item.product
                      : { productName: item.product, openingStock: 0, category: "" };

                  const productName = product.productName || "—";
                  const openingStock = product.openingStock ?? 0;

                  // Resolve category
                  let categoryName = "—";
                  if (typeof product.category === "object" && product.category?.categoryName) {
                    categoryName = product.category.categoryName;
                  } else if (typeof product.category === "string") {
                    const cat = categories.find((c) => c.id === product.category);
                    if (cat) categoryName = (cat as Category).categoryName;
                  }

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition border-b border-gray-100"
                    >
                      <td className="px-4 py-2 font-medium max-w-[220px] truncate" title={productName}>
                        {productName}
                      </td>
                      <td className="px-4 py-2 max-w-[180px] truncate" title={categoryName}>
                        {categoryName}
                      </td>
                      <td className="px-4 py-2">{openingStock}</td>
                      <td className="px-4 py-2 text-green-600">+{item.purchasedQty || 0}</td>
                      <td className="px-4 py-2 text-red-600">-{item.soldQty || 0}</td>
                      <td className="px-4 py-2 font-semibold text-blue-700">{item.currentStock}</td>
                      <td className="px-4 py-2 text-gray-500">
                        {item.lastUpdated ? new Date(item.lastUpdated).toLocaleDateString() : "—"}
                      </td>
                    </tr>
                  );
                })
              : (
                <tr>
                  <td colSpan={7} className="text-center p-5 text-gray-500">
                    No inventory records found.
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
