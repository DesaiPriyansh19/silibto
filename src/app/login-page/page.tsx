"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

interface Brand { id: string; name: string; description?: string }
interface Branch { id: string; name: string; location?: string; brand: Brand }




export default function LoginPage() {
  const { user, login, selectBranch, isAuthenticated } = useAuth();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState("");

  const router = useRouter();
console.log("Backend URL:", process.env.NEXT_PUBLIC_SERVER_URL);
  // Handle branch selection display or redirect
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        router.replace("/"); // Admin → go home
        return;
      }
      const userBranches = Array.isArray(user.branches) ? user.branches : [];
      if (userBranches.length === 1) {
        selectBranch(userBranches[0]); // Auto select single branch
        return;
      }
      if (userBranches.length > 1) {
        setBranches(userBranches); // Show branch dropdown
      }
    }
  }, [isAuthenticated, user, router, selectBranch]);

  const handleLogin = async (e: React.FormEvent) => {
    

    e.preventDefault();
    if (!userId || !password) {
      toast.error("Please enter both User ID and Password");
      return;
    }

    setLoading(true);
try {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: userId, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    // 👇 Show exact backend error like inactive status
    throw new Error(data.errors?.[0]?.message || "Invalid credentials");
  }

  login({ user: data.user, token: data.token });

  if (data.user.role !== "admin" && data.user.branches?.length > 1) {
    setBranches(data.user.branches);
  }

  toast.success("Login successful!");
}  catch (err: unknown) {
  if (err instanceof Error) {
    toast.error(err.message);
  } else {
    toast.error("Login failed");
  }
}
finally {
  setLoading(false);
}

  };

const handleBranchSelect = () => {
  if (!selectedBranch) {
    toast.error("Please select a branch");
    return;
  }

  const branchObj = branches.find((b) => b.id === selectedBranch);

  if (!branchObj) {
    toast.error("Invalid branch selected");
    return;
  }

  selectBranch(branchObj); // now TypeScript knows branchObj is definitely Branch
  toast.success("Branch selected. Redirecting...");
};


  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white">
      <Toaster position="top-right" />

      {/* Left - Logo */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#f0fdf4]">
        <Image
          src="/logo-big.png"
          alt="Silibto Logo"
          width={200}
          height={200}
          className="w-48 md:w-72 lg:w-96"
        />
      </div>

      {/* Right - Login / Branch selection */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-[#f5fff6] border-2 border-[#06b81e] p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md transition-all hover:shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-[#0d751b]">Welcome to Silibto</h2>
          <p className="mb-6 font-light text-base md:text-lg text-[#0d751b]">Please login to continue</p>

          {/* Branch Selection */}
          {branches.length > 0 ? (
            <div className="flex flex-col gap-5">
              <p className="mb-2 font-medium">Select a branch to continue:</p>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="p-3 border-2 border-[#0d751b] rounded-md outline-none"
              >
                <option value="">-- Select Branch --</option>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleBranchSelect}
                className="bg-[#0d751b] text-white p-3 rounded-2xl mt-2 hover:scale-95 transition-all duration-300"
              >
                Continue
              </button>
            </div>
          ) : (
            /* Login Form */
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="p-3 border-b-2 border-[#0d751b] text-black outline-none transition-all duration-300 focus:border-[#06b81e] focus:scale-[1.02]"
                disabled={loading}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 border-b-2 border-[#0d751b] text-black outline-none transition-all duration-300 focus:border-[#06b81e] focus:scale-[1.02]"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className={`group relative hover:scale-95 bg-[#0d751b] text-sm md:text-base font-semibold text-white p-3 mt-2 rounded-2xl 
                  transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Login</span>
                    <FiArrowRight className="text-xl font-bold transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
