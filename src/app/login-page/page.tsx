"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Redirect to home if already logged in
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/"); 
    }
  }, [isAuthenticated, loading, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("UserID:", userId, "Password:", password);
    login();
  };

  // Show nothing while auth status is loading
  if (loading || isAuthenticated) return null;

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white">
      {/* Left Section - Logo */}
      <div className="flex-1 flex items-center justify-center p-6">
        <Image
          src={"/logo.webp"}
          alt="Silibito Logo"
          width={350}
          height={350}
          className="w-48 md:w-72 lg:w-96"
        />
      </div>

      {/* Right Section - Login Box */}
      <div className="flex-1 flex items-center justify-center p-6 text-[#0d751b]">
        <div className="bg-[#f5fff6] border-2 border-[#06b81e] p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md transition-all hover:shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Welcome to Silibito
          </h2>
          <p className="mb-6 font-light text-base md:text-lg">Please login to continue</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="p-3 border-b-2 border-[#0d751b] text-black outline-none transition-all duration-300 focus:border-[#06b81e] focus:scale-[1.02]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border-b-2 border-[#0d751b] text-black outline-none transition-all duration-300 focus:border-[#06b81e] focus:scale-[1.02]"
            />
            <button
              type="submit"
              className="group hover:scale-95 bg-[#0d751b] text-sm md:text-base font-semibold text-white p-3 mt-2 rounded-2xl 
              transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
            >
              <span>Login</span>
              <FiArrowRight
                className="text-xl font-bold transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
