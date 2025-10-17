
"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import {
  HiMenu,
  HiX,
  HiChevronRight,
  HiChevronDown,
} from "react-icons/hi";
import { FiBell, FiSettings,FiLogOut } from "react-icons/fi";

import Link from "next/link";
import Home from "@/assets/icons/Home.svg";
import { useRouter } from "next/navigation";
// Define lower nav structure
const lowerNavItems: Record<string, string[]> = {
  Product:["Product Master"],
  Sales: ["New Lead", "New Inquiry", "Pending Inquiry"],
  Purchase: ["Purchase Item1", "Purchase Item2"],
  Stocks: ["Stocks Item1", "Stocks Item2"],
  ClientData: ["Add New Client","Add Family Group","Clients List"],
 Users:['Manage Users',"Create Users" ]
};

// Map each submenu item to a href
const lowerNavLinks: Record<string, string> = {
  "Product Master":"/product/product-master",
  "New Lead": "",
  "New Inquiry": "",
  "Pending Inquiry": "",
  "Purchase Item1": "",
  "Purchase Item2": "",
  "Stocks Item1": "",
  "Stocks Item2": "",
  "Add New Client": "/clients/add-new-client",
  "Clients List":"/clients/client-list",
  "Add Family Group" :"/create-family-group",
  "Manage Users": "/users-permissions/user-management",
  "Create Users":"/users-permissions/create-user",

};

// Upper nav items
const upperNavItems: string[] = [
  "Home",
    "Product",
  "Sales",
  "Purchase",
  "Stocks",
  "ClientData",
  "Accounts",
  "Calendar",
  "Report",
  "Users",
];

export default function Navbar() {
  const [activeUpper, setActiveUpper] = useState<string>("Home");
 const [activeLower, setActiveLower] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
   const router = useRouter(); // inside the component
 const { user, selectedBranch } = useAuth(); // selectedBranch is already the object
console.log("Selected Branch:", selectedBranch);
console.log("Brand:", user?.brand?.name);

// Brand name
const brandName = user?.brand?.name ?? "Brand";

// Branch name: if selectedBranch is an object, use its name
const branchName = selectedBranch?.name ?? "Branch";

console.log("Branch", branchName);
console.log("Brand", brandName);
const { logout } = useAuth();
useEffect(() => {
  if (isSidebarOpen) {
    // Lock scroll
    document.body.style.overflow = "hidden";
  } else {
    // Unlock scroll
    document.body.style.overflow = "auto";
  }
}, [isSidebarOpen]);
  return (
    <div className="flex w-full border-[#E6E6E6] border-b-4 min-h-[14vh]">
      {/* Left - Logo */}
      <div className=" lg:w-[15%] hidden lg:flex items-center justify-center">
        <Link href={"/"}>
          <Image src="/logo.webp" alt="Logo" width={110} height={110} />
        </Link>
      </div>
      <div className="w-[13%] sm:w-[10%] ml-3 flex lg:hidden  items-center justify-center">
        <Image src="/small-logo.png" alt="Logo" width={110} height={110} />
      </div>

      {/* Middle Nav */}
      <div className="w-[60%] lg:w-[70%] pl-2 hidden lg:block">
<ul className="flex gap-2 font-semibold text-sm bg-[#E6E6E6] overflow-x-scroll h-[50%] scrollbar-hide">


          {/* Home Logo */}
          <li
            onClick={() => {
              setActiveUpper("Home");
            }}
            className={`cursor-pointer hover:scale-105 transition-all duration-100 flex items-center justify-center px-2 h-full ${
              activeUpper === "Home" ? "bg-[#F2F2F2]" : ""
            }`}
          >
            <Link href="/">
              <Home className="" />
            </Link>
          </li>
 
          {upperNavItems
            .filter((item) => item !== "Home")
            .map((item) => (
           <li
  key={item}
  onClick={() => {
    setActiveUpper(item);
    if (item === "Home") {
      setActiveLower(""); // reset lower when Home is clicked
    }
  }}
      className={`cursor-pointer hover:scale-105 transition-all duration-200 flex items-center justify-center px-2 h-full ${
                  activeUpper === item ? "bg-[#F2F2F2]" : ""
                }`}
>
  {item === "Home" ? <Link href="/">{item}</Link> : item}
</li>

            ))}

             {/* Logout button */}
            <li className="cursor-pointer hover:scale-105 transition-all duration-100 flex items-center justify-center px-2 h-full text-red-700">         
  <button
    onClick={logout}
    className=""
  >
    Logout
  </button></li>
        </ul>

        <ul className="flex bg-[#F2F2F2] h-[50%] pl-2">
          {(lowerNavItems[activeUpper] ?? []).map((item) => {
            const href = lowerNavLinks[item];
   return (
          <li
            key={item}
            onClick={() => {
              setActiveLower(`${activeUpper}|${item}`);
              if (href) router.push(href); // works now
            }}
            className={`flex items-center justify-center font-normal text-sm xl:text-[1rem] my-1 rounded-lg px-4 cursor-pointer ${
              activeLower === `${activeUpper}|${item}`
                ? "bg-white text-black"
                : "text-gray-700"
            }`}
          >
            {item}
          </li>
        );
      })}
    </ul>

  

      </div>

   {/* Right Side - Desktop */}
      <div className="w-[15%] flex-col hidden lg:flex">
        <div className="w-full h-[50%] bg-[#8BE497] text-black font-semibold text-center py-3">
          {brandName}
        </div>
        <div className="w-full h-[50%] bg-[#5DD86E] text-black font-normal text-center py-2">
          {branchName}
        </div>
      </div>

      {/* Mobile / Tablet View */}
      <div className="flex lg:hidden w-[85%] text-lg sm:text-2xl text-center justify-between items-center px-4">
        <div className="flex flex-col items-center mx-auto">
          <span className="font-semibold">{brandName}</span>
          <span>{branchName}</span>
        </div>
        <button
          className="bg-[#8BE497] p-2 rounded"
          onClick={() => setIsSidebarOpen(true)}
        >
          <HiMenu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/18 backdrop-blur-[2px] z-40"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

      <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col transition-transform duration-300">
  {/* Header */}
  <div className="flex justify-center items-center gap-2 px-1 pt-1 pb-2 shrink-0">
    <div className="flex items-center justify-center">
      <Image src="/small-logo.png" alt="Logo" width={50} height={50} />
      <span className="flex flex-col gap-0">
        <p className="text-sm font-bold m-0">Welcome</p>
        <p className="text-xsm font-normal m-0">{user?.fullName ?? "User"}</p>
        <p className="text-sm font-normal text-gray-700 m-0">{user?.role ?? "Role"}</p>
      </span>
    </div>

    <FiBell className="text-2xl cursor-pointer mt-10" />
    <select className="rounded-lg text-sm border-[1.8px] px-2 py-1 mt-10">
      <option>2024</option>
      <option>2023</option>
    </select>

    <button
      className="absolute top-1.5 right-1.5"
      onClick={() => setIsSidebarOpen(false)}
    >
      <HiX size={24} />
    </button>
  </div>

  {/* Scrollable Menu */}
  <ul className="flex-1 overflow-y-auto font-semibold text-sm">
    {upperNavItems.map((item) => {
      if (item === "Home") {
        return (
          <li
            key="Home"
            className={`border-b px-4 py-2 cursor-pointer ${
              activeUpper === "Home" ? "bg-[#F2F2F2]" : ""
            }`}
            onClick={() => {
              setActiveUpper("Home");
              setIsSidebarOpen(false);
            }}
          >
            <Link href="/">Home</Link>
          </li>
        );
      }

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

          {hasSub && (
            <ul
              className={`pl-6 pr-4 overflow-y-auto transition-all duration-300 ${
                isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {hasSub.map((sub) => {
                const href = lowerNavLinks[sub];
                return (
                  <li
                    key={sub}
                    className={`py-1 cursor-pointer ${
                      activeLower === `${activeUpper}|${sub}`
                        ? "text-black font-medium"
                        : "text-gray-600"
                    }`}
                    onClick={() => {
                      setActiveLower(`${activeUpper}|${sub}`);
                      setIsSidebarOpen(false);
                    }}
                  >
                    {href ? <Link href={href}>• {sub}</Link> : <>• {sub}</>}
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      );
    })}
  </ul>

  {/* Footer (fixed at bottom) */}
  <div className="shrink-0 bg-white w-full py-2 flex items-center justify-end gap-4 px-3 border-t">
    <FiSettings className="text-2xl cursor-pointer" />
    <button
      onClick={logout}
      className="ml-2 bg-[#B3261E] text-sm flex items-center justify-center gap-2 text-white px-4 py-[0.5rem] rounded-xl"
    >
      Logout <FiLogOut className="text-lg cursor-pointer" />
    </button>
  </div>
</div>

        </>
      )}
    </div>
  );
}
