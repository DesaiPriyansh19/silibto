"use client";

import React from "react";
import Image from "next/image";
import { FiSearch, FiX, FiBell, FiSettings, FiArrowRight } from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", sales: 10000 },
  { month: "Feb", sales: 20000 },
  { month: "Mar", sales: 15000 },
  { month: "Apr", sales: 25000 },
  { month: "May", sales: 30000 },
];

export default function HomePage() {
  return (
    <div className="p-6 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left - Logo + Welcome */}
        <div className="hidden lg:flex items-center gap-2">
          <Image src="/user-avatar.png" alt="Logo" width={40} height={40} />
          <div>
            <p className="text-sm font-bold">Welcome</p>
            <p className="text-lg font-normal">Rina Patel</p>
          </div>
        </div>

        {/* Middle - Search */}
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 w-full md:w-1/3">
          <FiX className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search product"
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>

        {/* Right - Icons + Year */}
        <div className="flex items-center gap-4">
          <FiBell className="text-xl cursor-pointer" />
          <FiSettings className="text-xl cursor-pointer" />
          <select className="rounded-full border px-3 py-1">
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-[#FFFFFF] to-[#81D9E6] text-black p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Purchase Order</p>
            <div className="bg-black p-2 rounded-full hover:scale-115 transition-all duration-200 cursor-pointer hover:ml-1.5">
              <FiArrowRight className="text-white" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <p>Pending</p>
              <p>55</p>
            </div>
            <div className="flex justify-between">
              <p>Placed</p>
              <p>103</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#FFFFFF] to-[#8BE497] text-black p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Purchase Order</p>
            <div className="bg-black p-2 rounded-full hover:scale-115 transition-all duration-100 cursor-pointer">
              <FiArrowRight className="text-white" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <p>Pending</p>
              <p>55</p>
            </div>
            <div className="flex justify-between">
              <p>Placed</p>
              <p>103</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#FFFFFF] to-[#FFB1B1] text-black p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Purchase Order</p>
            <div className="bg-black p-2 rounded-full hover:scale-115 transition-all duration-100 cursor-pointer">
              <FiArrowRight className="text-white" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <p>Pending</p>
              <p>55</p>
            </div>
            <div className="flex justify-between">
              <p>Placed</p>
              <p>103</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#FFFFFF] to-[#D9B9FF] text-black p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Purchase Order</p>
            <div className="bg-black p-2 rounded-full hover:scale-115 transition-all duration-100 cursor-pointer">
              <FiArrowRight className="text-white" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <p>Pending</p>
              <p>55</p>
            </div>
            <div className="flex justify-between">
              <p>Placed</p>
              <p>103</p>
            </div>
          </div>
        </div>
      </div>

      {/* Operations */}
      <div>
        <h2 className="text-xl font-bold mb-4">Operations</h2>
        <div className="w-full flex flex-wrap justify-start items-center gap-6">
          {["Make Sell", "Place PO", "Rec. PO", "Delivery"].map((op, i) => (
            <div
              key={i}
              className="w-full sm:w-1/2 md:w-1/4 border rounded-lg p-6 flex flex-col items-center"
            >
              <div className="bg-black text-white p-4 rounded-full mb-3">Logo</div>
              <h4 className="font-medium">{op}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Sales Report */}
      <div>
        <h2 className="text-xl font-bold mb-4">Sales Report</h2>
        <div className="w-full h-72 bg-white rounded-lg border p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(val) => `${val / 1000}k`} />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#03B58B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
