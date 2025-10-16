"use client";
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
import { FiBell, FiSettings } from "react-icons/fi";
import Link from "next/link";
import Home from "@/assets/icons/Home.svg";

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
              // inside lower nav rendering
        
<li
  key={item}
  onClick={() => setActiveLower(`${activeUpper}|${item}`)}
  className={`py-1  my-1 rounded-lg px-4 cursor-pointer ${
    activeLower === `${activeUpper}|${item}`
      ? "bg-white text-black"
      : "text-gray-800"
  }`}
>
  {href ? <Link href={href}>{item}</Link> : item}
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

          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col overflow-y-auto transition-transform duration-300">
            <div className="flex justify-between p-4">
              <div className="flex ">
                <Image
                  src="/small-logo.png"
                  alt="Logo"
                  width={50}
                  height={50}
                />
                <span>
                  <p className="text-sm font-bold">Welcome </p>
                  <p className="text-lg font-normal">User </p>
                </span>
              </div>
              <button onClick={() => setIsSidebarOpen(false)}>
                <HiX size={24} />
              </button>
            </div>

            <ul className="flex flex-col font-semibold text-sm">
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

                const hasSub: string[] | undefined = lowerNavItems[item];
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
                        className={`pl-6 pr-4 overflow-hidden transition-all duration-300 ${
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
    setIsSidebarOpen(false); // close sidebar after clicking sub-link
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
            {/* Right - Icons + Year */}
            <div className="absolute bg-white z-10right-1 bottom-2 flex items-center gap-4">
              <button
    onClick={logout}
    className=" ml-2 border-[1px] border-red-700 text-red-700 px-2 py-1 text-sm rounded-sm mt-3"
  >
    Logout
  </button> 
              <FiBell className="text-xl cursor-pointer" />
              <FiSettings className="text-xl cursor-pointer" />
              <select className="rounded-full border px-3 py-1">
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
