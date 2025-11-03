"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface Client {
  id: string;
  firstName: string;
  middleName?: string;
  surname: string;
  gender: string;
  phone1: string;
  phone2?: string;
  address?: string;
  reference?: string;
  familyGroup?: { id: string; headName?: string } | string;
}

export default function ClientsList() {
  const { token, user } = useAuth();
  const router = useRouter();

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // ✅ Fetch all clients only once
  useEffect(() => {
    if (user?.role === "admin") fetchAllClients();
  }, [token, user]);

  const fetchAllClients = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/clients?depth=1&limit=1000`,
        { headers: { Authorization: `Bearer ${token}` }, credentials: "include" }
      );
      const data = await res.json();
      if (res.ok) setClients(data?.docs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fast local filter — checks all fields
  const filteredClients = useMemo(() => {
    if (!search.trim()) return clients;
    const lowerSearch = search.toLowerCase();

    return clients.filter((c) =>
      [
        c.firstName,
        c.middleName,
        c.surname,
        c.gender,
        c.phone1,
        c.phone2,
        c.address,
        c.reference,
        typeof c.familyGroup === "object" ? c.familyGroup?.headName : c.familyGroup,
      ]
        .filter(Boolean)
        .some((field) => field!.toString().toLowerCase().includes(lowerSearch))
    );
  }, [search, clients]);

  return (
    <div className="p-2 md:p-6 min-h-screen">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Clients</h2>

      {/* 🔍 Instant local search */}
      <div className="flex flex-wrap gap-3 mb-6 items-end text-sm">
        <input
          type="text"
          placeholder="Search by anything..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-[2px] border-gray-300 rounded-lg text-black p-2 flex-1"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border-[2px] border-gray-300 bg-white rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="font-medium">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Gender</th>
              <th className="px-4 py-2 text-left">Phone 1</th>
              <th className="px-4 py-2 text-left">Phone 2</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Reference</th>
              <th className="px-4 py-2 text-left">Family Group</th>
              <th className="px-4 py-2 text-left">Manage</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm xl:text-lg">
            {loading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    {Array.from({ length: 8 }).map((__, colIdx) => (
                      <td key={colIdx} className="px-4 py-3">
                        <div className="relative overflow-hidden rounded-md bg-gray-200 h-5 w-full">
                          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))
              : filteredClients.length > 0
              ? filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 font-medium whitespace-nowrap">
                      {client.firstName || "-"}{" "}
                      {client.middleName ? client.middleName + " " : ""}
                      {client.surname || "-"}
                    </td>
                    <td className="px-4 py-2">{client.gender || "-"}</td>
                    <td className="px-4 py-2">{client.phone1 || "-"}</td>
                    <td className="px-4 py-2">{client.phone2 || "-"}</td>
                    <td className="px-4 py-2">{client.address || "-"}</td>
                    <td className="px-4 py-2">{client.reference || "-"}</td>
                    <td className="px-4 py-2">
                      {typeof client.familyGroup === "object"
                        ? client.familyGroup?.headName || "—"
                        : client.familyGroup || "—"}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-[#8BE497] hover:scale-95 text-black px-3 py-1 rounded-lg transition"
                        onClick={() =>
                          router.push(`/clients/client-details/${client.id}`)
                        }
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              : (
                <tr>
                  <td colSpan={8} className="text-center p-5 text-gray-500">
                    No clients found.
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
