"use client";

import React from "react";
import Image from "next/image";
import {  FiX, FiBell, FiSettings, FiArrowRight } from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DeliveryIcon from "@/assets/icons/DeliveryIcon.svg";
import DownArrow from "@/assets/icons/DownArrow.svg";
import FileIcon from "@/assets/icons/FileIcon.svg";
import PoIcon from "@/assets/icons/PoIcon.svg";
import Link from "next/link";
const data = [
  { month: "Jan", sales: 10000 },
  { month: "Feb", sales: 20000 },
  { month: "Mar", sales: 15000 },
  { month: "Apr", sales: 25000 },
  { month: "May", sales: 30000 },
];
const operations = [
  { name: "Make Sell", icon: FileIcon,bg: "bg-[#e2f4ff]", border: "border-[#88C9F2]" , link:"/new-sales-order" },
  { name: "Place PO", icon: PoIcon ,bg: "bg-[#fadada]", border: "border-[#F28888]" , link:"/new-sales-order"  },
  { name: "Rec. PO", icon: DownArrow ,bg: "bg-[#d9fcde]", border: "border-[#8BE497]", link:"/new-sales-order"  },
  { name: "Delivery", icon: DeliveryIcon ,bg: "bg-[#f1e6fe]", border: "border-[#D9B9FF]" , link:"/delivery" },
];


export default function HomePage() {
  return (
    <div className="p-4 md:p-6 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-[#fadada]">
        {/* Left - Logo + Welcome */}
        <div className="hidden lg:static lg:flex items-center gap-2">
          <Image src="/user-avatar.png" alt="Logo" width={40} height={40} />
          <div>
            <p className="text-sm font-bold">Welcome</p>
            <p className="text-lg font-normal">Rina Patel</p>
          </div>
        </div>

        {/* Middle - Search */}
        <div className="flex items-center bg-white border-[2px]  border-[#E6E6E6] rounded-full px-3 py-2 w-full md:w-1/3">
          <FiX className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search product"
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>

        {/* Right - Icons + Year */}
        <div className=" hidden lg:flex items-center gap-4">
          <FiBell className="text-xl cursor-pointer" />
          <FiSettings className="text-xl cursor-pointer" />
          <select className="rounded-full border px-3 py-1">
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ">
             <div className="bg-gradient-to-r from-[#FFFFFF] to-[#8BE497] text-black p-4 rounded-lg hover:shadow-lg">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Purchase Order</p>
         <div className="group inline-flex items-center">

  <Link href={''}><div className="bg-black p-2 rounded-full transition-transform duration-100 ease-in-out group-hover:scale-105 group-hover:bg-gray-800 cursor-pointer">
    <FiArrowRight 
      className="text-white transition-transform duration-100 ease-in-out group-hover:translate-x-1" 
    />
  </div></Link>

</div>

          </div>
          <div className="mt-4 space-y-2 font-extralight  ">
            <div className="flex justify-between ">
              <p>Pending</p>
              <p>55</p>
            </div>
            <div className="flex justify-between">
              <p>Placed</p>
              <p>103</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#FFFFFF] to-[#81D9E6] text-black p-4 rounded-lg hover:shadow-lg">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Sales Order</p>
         <div className="group inline-flex items-center">
  <Link href={'/new-sales-order'}><div className="bg-black p-2 rounded-full transition-transform duration-100 ease-in-out group-hover:scale-105 group-hover:bg-gray-800 cursor-pointer">
    <FiArrowRight 
      className="text-white transition-transform duration-100 ease-in-out group-hover:translate-x-1" 
    />
  </div></Link>
  <div className=""></div>
</div>

          </div>
          <div className="mt-4 space-y-2 font-extralight  ">
            <div className="flex justify-between ">
              <p>Pending</p>
              <p>55</p>
            </div>
            <div className="flex justify-between">
              <p>Placed</p>
              <p>103</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#FFFFFF] to-[#FFB1B1] text-black p-4 rounded-lg hover:shadow-lg">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Delivery Tray</p>
         <div className="group inline-flex items-center">
<Link href={'/delivery'}> <div className="bg-black p-2 rounded-full transition-transform duration-100 ease-in-out group-hover:scale-105 group-hover:bg-gray-800 cursor-pointer">
    <FiArrowRight 
      className="text-white transition-transform duration-100 ease-in-out group-hover:translate-x-1" 
    />
  </div></Link>
</div>

          </div>
          <div className="mt-4 space-y-2 font-extralight  ">
            <div className="flex justify-between ">
              <p>Pending</p>
              <p>55</p>
            </div>
            <div className="flex justify-between">
              <p>Placed</p>
              <p>103</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#FFFFFF] to-[#D9B9FF] text-black p-4 rounded-lg hover:shadow-lg">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Vendor Tray</p>
         <div className="group inline-flex items-center">
  <div className="bg-black p-2 rounded-full transition-transform duration-100 ease-in-out group-hover:scale-105 group-hover:bg-gray-800 cursor-pointer">
    <FiArrowRight 
      className="text-white transition-transform duration-100 ease-in-out group-hover:translate-x-1" 
    />
  </div>
</div>

          </div>
          <div className="mt-4 space-y-2 font-extralight  ">
            <div className="flex justify-between ">
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
  <div className="w-full grid grid-cols-2 sm:flex sm:flex-wrap lg:flex-row lg:flex-nowrap justify-start items-center gap-6">
    {operations.map((op, i) => {
      const Icon = op.icon;
      return (
     <div
  key={i}
  className={`w-full sm:w-[20%] lg:w-[15%] border-2 rounded-lg py-4 px-2 flex flex-col items-center ${op.bg} ${op.border} 
              hover:shadow-lg transition-shadow duration-100`}
>
 <Link href={op.link}>
  <div className="text-white text-sm p-4 rounded-full mb-3 bg-[#2C2C2C] 
                  hover:shadow-lg hover:-translate-y-1 hover:scale-95 transition-all duration-200">
    <Icon className="text-2xl" />
  </div></Link>
  <h4 className="font-medium">{op.name}</h4>
</div>

      );
    })}
  </div>
</div>



      {/* Sales Report */}
      <div className="">
        <h2 className="text-xl font-bold mb-4">Sales Report</h2>
        <div className="w-full h-96 text-sm lg:text-lg xl:text-xl bg-white rounded-lg border lg:p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(val) => `${val / 1000}k`} />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#81D9E6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
