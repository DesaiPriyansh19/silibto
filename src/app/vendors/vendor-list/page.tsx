"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiRefreshCcw } from "react-icons/fi"; // import refresh icon
interface Vendor {
  id: string;
  companyName: string;
  contactPerson: string;
  contactNumber: string;
  gstNumber: string;
  address?: string;
  email?: string;
}

export default function VendorsList() {
  const { token, user } = useAuth();
  const router = useRouter();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filtered, setFiltered] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    if (user?.role === "admin") fetchVendors();
  }, [token, user]);

  const fetchVendors = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/vendors?depth=1`,
        { headers: { Authorization: `Bearer ${token}` }, credentials: "include" }
      );
      const data = await res.json();
      if (res.ok) {
        setVendors(data?.docs || []);
        setFiltered(data?.docs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Debounced Instant Search (500ms delay)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const query = search.toLowerCase().trim();
      if (!query) {
        setFiltered(vendors);
      } else {
        setFiltered(
          vendors.filter((vendor) =>
            [vendor.companyName, vendor.contactPerson, vendor.contactNumber, vendor.gstNumber]
              .some((field) => field?.toLowerCase().includes(query))
          )
        );
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [search, vendors]);

  const handleRefresh = async () => {
    if (isRefreshing) return; // prevent multiple clicks
    setIsRefreshing(true);

    await fetchVendors();

    // Fast animation (about 0.6s) then unlock
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="p-2 md:p-6 min-h-screen">
    <div className="flex items-center justify-between mb-3 "> 
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Vendors</h2>
      <Link href={'/vendors/add-vendor'}> <button className="bg-[#5DD86E] text-black px-4 py-2 text-sm rounded-lg hover:scale-95 flex items-center gap-1">+ add new vendor</button> </Link> 
         </div>  

      {/* Search */}
      <div className="flex flex-wrap gap-3 mb-6 items-end text-sm">
        <input
          type="text"
          placeholder="Search by Company, GST, Contact..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-[2px] border-gray-300 rounded-lg text-black p-2 flex-1"
        />
           <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg transition-transform duration-200 
                ${isRefreshing ? "opacity-70 cursor-not-allowed" : "hover:scale-95"}`}
            >
              <FiRefreshCcw
                className={`text-lg   transition-transform duration-500 ease-in-out text-white ${
                  isRefreshing ? "rotate-[720deg]" : "rotate-0"
                }`}
              />
              <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
            </button>
        {loading && (
          <></>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border-[2px] border-gray-300 bg-white rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="font-medium">
              <th className="px-4 py-2 text-left">Company Name</th>
              <th className="px-4 py-2 text-left">Contact Person</th>
              <th className="px-4 py-2 text-left">Contact Number</th>
              <th className="px-4 py-2 text-left">GST Number</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Email</th>
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
              : filtered.length > 0
              ? filtered.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 font-medium whitespace-nowrap">{vendor.companyName || "-"}</td>
                    <td className="px-4 py-2">{vendor.contactPerson || "-"}</td>
                    <td className="px-4 py-2">{vendor.contactNumber || "-"}</td>
                    <td className="px-4 py-2">{vendor.gstNumber || "-"}</td>
                    <td className="px-4 py-2">{vendor.address || "-"}</td>
                    <td className="px-4 py-2">{vendor.email || "-"}</td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-[#8BE497] hover:scale-95 text-black px-3 py-1 rounded-lg transition"
                        onClick={() => router.push(`/vendors/vendor-details/${vendor.id}`)}
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              : (
                <tr>
                  <td colSpan={7} className="text-center p-5 text-gray-500">
                    No vendors found.
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
