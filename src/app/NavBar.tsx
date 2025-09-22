"use client";

import { useState } from "react";
import Image from "next/image";
import { HiMenu, HiX, HiChevronRight, HiChevronDown } from "react-icons/hi";

export default function Navbar() {
  const [activeUpper, setActiveUpper] = useState("Sales");
  const [activeLower, setActiveLower] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const upperNavItems = [
    "Sales",
    "Purchase",
    "Stocks",
    "Client Data",
    "Accounts",
    "Calendar",
    "Report",
    "User",
  ];

 const lowerNavItems: { [key: string]: string[] } = {
  Sales: ["Item1", "Item2"],
  Purchase: ["Item1", "Item2"],
  Stocks: ["Item1", "Item2"]
};


  return (
    <div className="flex w-full border-[#E6E6E6] border-b-4 min-h-[14vh]">
      {/* Left - Logo */}
       {/* big screen */}
      <div className=" lg:w-[15%] hidden lg:flex items-center justify-center">
        <Image src="/logo.webp" alt="Logo" width={110} height={110} />
      </div>
    {/* small screen screen */}
   <div className="w-[13%] sm:w-[10%] ml-3 flex lg:hidden  items-center justify-center">
        <Image src="/small-logo.png" alt="Logo" width={110} height={110} />
      </div>
      {/* Middle Nav (hidden on lg and below) */}
      <div className="w-[60%] lg:w-[70%] pl-2 hidden lg:block">
        {/* Upper nav */}
        <ul className="flex gap-2 font-semibold text-sm bg-[#E6E6E6] h-[50%]">
          {upperNavItems.map((item) => (
            <li
              key={item}
              onClick={() => {
                setActiveUpper(item);
                setActiveLower("");
              }}
              className={`cursor-pointer hover:scale-105 transition-all duration-200 flex items-center justify-center px-2 h-full ${
                activeUpper === item ? "bg-[#F2F2F2]" : ""
              }`}
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Lower nav */}
        <ul className="flex bg-[#F2F2F2] h-[50%] pl-2">
          {(lowerNavItems[activeUpper] || []).map((item) => (
            <li
              key={item}
              onClick={() => setActiveLower(item)}
              className={`cursor-pointer hover:scale-105 transition-all duration-200 flex items-center justify-center px-4 py-2 my-1.5 rounded-xl ${
                activeLower === item ? "bg-white" : ""
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side (hidden on lg and below) */}
      <div className="w-[15%]  flex-col hidden lg:flex">
        <div className="w-full h-[50%] bg-[#8BE497] text-black font-semibold text-center py-3">
          Shreeji Opticals
        </div>
        <div className="w-full h-[50%] bg-[#5DD86E] text-black font-normal text-center py-2">
          Vastrapur
        </div>
      </div>

      {/* Mobile / Tablet View */}
      <div className="flex lg:hidden w-[85%] text-lg sm:text-2xl text-center justify-between items-center px-4">
        {/* Center text */}
        <div className="flex flex-col items-center  mx-auto">
          <span className="font-semibold">Shreeji Opticals</span>
          <span className="">Vastrapur</span>
        </div>

        {/* Toggle btn */}
        <button
          className="bg-[#8BE497] p-2 rounded"
          onClick={() => setIsSidebarOpen(true)}
        >
          <HiMenu size={24} />
        </button>
      </div>

      {/* Sidebar with Blur Overlay */}
      {isSidebarOpen && (
        <>
          {/* Background Blur */}
          <div
            className="fixed inset-0 bg-black/18 backdrop-blur-[2px] z-40"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col transition-transform duration-300">
            {/* Close Button */}
            <div className="flex justify-between p-4">
              <div className="flex ">
              <Image src="/small-logo.png" alt="Logo" width={50} height={50} />  
<span><p className="text-sm font-bold">Welcome </p><p className="text-lg font-normal">User </p></span>
              </div>

              <button onClick={() => setIsSidebarOpen(false)}>
                <HiX size={24} />
              </button>
            </div>

            {/* Sidebar Nav */}
            <ul className="flex flex-col font-semibold text-sm">
              {upperNavItems.map((item) => {
                const hasSub = lowerNavItems[item];
                const isOpen = openSubMenu === item;

                return (
                  <li key={item} className="border-b">
                    <div
                      className={`flex justify-between items-center cursor-pointer px-4 py-2 ${
                        activeUpper === item ? "bg-[#F2F2F2]" : ""
                      }`}
                      onClick={() => {
                        setActiveUpper(item);
                        setActiveLower("");
                        setOpenSubMenu(isOpen ? null : item);
                      }}
                    >
                      <span>{item}</span>
                      {hasSub &&
                        (isOpen ? (
                          <HiChevronDown size={18} />
                        ) : (
                          <HiChevronRight size={18} />
                        ))}
                    </div>

                    {/* Sub items */}
                    {hasSub && (
                      <ul
                        className={`pl-6 pr-4 overflow-hidden transition-all duration-300 ${
                          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        {lowerNavItems[item].map((sub) => (
                          <li
                            key={sub}
                            className={`py-1 cursor-pointer text-gray-600 ${
                              activeLower === sub
                                ? "text-black font-medium"
                                : ""
                            }`}
                            onClick={() => setActiveLower(sub)}
                          >
                            • {sub}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
