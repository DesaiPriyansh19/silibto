"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiRefreshCcw } from "react-icons/fi"; // import refresh icon
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

  // ✅ Fetch products
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch categories
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
      console.error(err);
    }
  };

  // ✅ Fast local filter — by search + category
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (p) =>
          (typeof p.category === "object" && p.category?.id === selectedCategory) ||
          p.category === selectedCategory
      );
    }

    // Filter by search text
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


  const handleRefresh = async () => {
    if (isRefreshing) return; // prevent multiple clicks
    setIsRefreshing(true);

    await fetchAllProducts();

    // Fast animation (about 0.6s) then unlock
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="p-2 md:p-6 min-h-screen">
   
    <div className="flex items-center justify-between mb-3 lg:mb-6 xl:mb-10 "> 
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Products</h2>
      <Link href={'/product/add-product'}> 
      <button className="bg-[#5DD86E] text-black px-4 py-2 text-sm rounded-lg hover:scale-95 flex items-center gap-1">+ add new product</button> </Link> 
         </div>  
      {/* 🔍 Filters */}
      <div className="flex flex-wrap gap-3 mb-6 items-center text-sm">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-[2px] border-gray-300 bg-white rounded-lg text-black p-2 flex-1"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border-[2px] border-gray-300 bg-white rounded-lg text-black p-2"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.categoryName}
            </option>
          ))}
        </select>

     <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className={`flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg transition-transform duration-200 
        ${isRefreshing ? "opacity-70 cursor-not-allowed" : "hover:scale-95"}`}
    >
      <FiRefreshCcw
        className={`text-lg text-white transition-transform duration-500 ease-in-out ${
          isRefreshing ? "rotate-[720deg]" : "rotate-0"
        }`}
      />
      <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
    </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border-[2px] border-gray-300 bg-white rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="font-medium">
              <th className="px-4 py-2 text-left">Product Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Opening Stock</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Attributes</th>
              <th className="px-4 py-2 text-left">Created</th>
              <th className="px-4 py-2 text-left">Manage</th>
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
              : filteredProducts.length > 0
              ? filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 font-medium whitespace-nowrap">
                      {p.productName || "-"}
                    </td>
                    <td className="px-4 py-2">₹{p.price || "-"}</td>
                    <td className="px-4 py-2">{p.openingStock || "-"}</td>
                    <td className="px-4 py-2">
                      {typeof p.category === "object"
                        ? p.category?.categoryName
                        : p.category || "-"}
                    </td>
                    <td className="px-4 py-2 max-w-xs truncate">
                      {p.attributes
                        ? Object.entries(p.attributes)
                            .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
                            .join(" | ")
                        : "-"}
                    </td>
                    <td className="px-4 py-2 text-gray-500">
                      {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-[#8BE497] hover:scale-95 text-black px-3 py-1 rounded-lg transition"
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
