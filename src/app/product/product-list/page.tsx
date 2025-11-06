"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiRefreshCcw } from "react-icons/fi";

interface Product {
  id: string;
  productName: string;
  price: number;
  openingStock: number;
  category?: { id: string; categoryName: string } | string;
  attributes?: Record<string, any>;
  createdAt?: string;
}

export default function ProductsList() {
  const { token, user } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string; categoryName: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchAllProducts();
      fetchCategories();
    }
  }, [token, user]);

  // Fetch all products
  const fetchAllProducts = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?depth=2&limit=1000`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (res.ok) setProducts(data?.docs || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    if (!token) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-master?depth=0`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (res.ok) setCategories(data?.docs || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Filter products by search & category
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(
        (p) =>
          (typeof p.category === "object" && p.category?.id === selectedCategory) ||
          p.category === selectedCategory
      );
    }

    if (search.trim()) {
      const lower = search.toLowerCase();
      filtered = filtered.filter((p) =>
        [
          p.productName,
          p.price?.toString(),
          p.openingStock?.toString(),
          typeof p.category === "object" ? p.category?.categoryName : p.category,
          JSON.stringify(p.attributes || {}),
        ]
          .filter(Boolean)
          .some((v) => v!.toString().toLowerCase().includes(lower))
      );
    }

    return filtered;
  }, [products, search, selectedCategory]);

  // Refresh button
  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    await fetchAllProducts();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // Format attributes neatly
  const formatAttributes = (attributes?: Record<string, any>) => {
    if (!attributes) return "-";
    return Object.entries(attributes)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
      .join(" | ");
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Products</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/product/add-product">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
              + Add New Product
            </button>
          </Link>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg transition-transform duration-200 
              ${isRefreshing ? "opacity-70 cursor-not-allowed" : "hover:scale-95"}`}
          >
            <FiRefreshCcw
              className={`text-lg transition-transform duration-500 ease-in-out ${
                isRefreshing ? "rotate-[720deg]" : "rotate-0"
              }`}
            />
            <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.categoryName}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm md:text-base font-medium text-gray-700">
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Opening Stock</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Attributes</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Manage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {loading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    {Array.from({ length: 7 }).map((__, colIdx) => (
                      <td key={colIdx} className="px-4 py-3">
                        <div className="h-5 w-full bg-gray-200 rounded-md relative overflow-hidden">
                          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))
              : filteredProducts.length > 0
              ? filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium whitespace-nowrap">{p.productName || "-"}</td>
                    <td className="px-4 py-3">₹{p.price || "-"}</td>
                    <td className="px-4 py-3">{p.openingStock ?? "-"}</td>
                    <td className="px-4 py-3">
                      {typeof p.category === "object" ? p.category?.categoryName : p.category || "-"}
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate">{formatAttributes(p.attributes)}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {p.createdAt ? new Date(p.createdAt).toLocaleString() : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        className="bg-green-300 hover:bg-green-400 text-black px-3 py-1 rounded-lg transition"
                        onClick={() => router.push(`/products/${p.id}`)}
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              : (
                <tr>
                  <td colSpan={7} className="text-center p-5 text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
