"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext"; // 👈 import your auth context
interface Client {
  id: string;
  firstName: string;
  middleName?: string;
  surname: string;
  gender: string;
  phone1: string;
  phone1Primary?: boolean;
  phone2?: string;
  phone2Primary?: boolean;
  address?: string;
  reference?: string;
  familyGroup?: {
    id: string;
    name: string;
  };
}



const ClientsList = () => {
  const { token, user } = useAuth(); // 👈 get token and user
const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchClients = async (query = "") => {
    if (!token) return; // prevent unauthorized fetch
    setLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/clients?where[firstName][contains]=${query}&depth=1&page=1`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 include token
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error fetching clients:", data);
        setClients([]);
        return;
      }

      setClients(data?.docs || []);
    } catch (err) {
      console.error("Error fetching clients:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") fetchClients();
  }, [token, user]);

  const handleSearch = () => {
    fetchClients(search.trim());
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Clients</h1>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by first name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-all"
        >
          Search
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center text-gray-600">Loading clients...</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-green-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-left">Phone 1</th>
                <th className="p-3 text-left">Phone 2</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Reference</th>
                <th className="p-3 text-left">Family Group</th>
              </tr>
            </thead>
            <tbody>
              {clients.length > 0 ? (
                clients.map((client) => (
                  <tr key={client.id} className="border-b hover:bg-gray-50 transition-all">
                    <td className="p-3 font-medium text-gray-800">
                      {client.firstName}{" "}
                      {client.middleName ? client.middleName + " " : ""}
                      {client.surname}
                    </td>
                    <td className="p-3">{client.gender}</td>
                    <td className="p-3">{client.phone1}</td>
                    <td className="p-3">{client.phone2 || "-"}</td>
                    <td className="p-3">{client.address || "-"}</td>
                    <td className="p-3">{client.reference || "-"}</td>
                    <td className="p-3">
                      {client.familyGroup?.name || "—"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center p-5 text-gray-500">
                    No clients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClientsList;
