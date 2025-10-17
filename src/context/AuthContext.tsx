"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

// Types
interface Brand { id: string; name: string; description?: string; }
interface Branch { id: string; name: string; location?: string; brand: Brand; }
interface User { id: string; fullName?: string; email: string; role: string; brand: Brand; branches?: Branch[]; [key: string]: any; }

interface AuthContextType {
  user: User | null;
  token: string | null;
  selectedBranch: Branch | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (payload: { user: User; token: string }) => void;
  logout: () => void;
  selectBranch: (branch: Branch) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Helper: Check if JWT is expired
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000; // convert to ms
    return Date.now() > exp;
  } catch {
    return true; // invalid token → treat as expired
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load from localStorage + check token validity
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      const storedBranch = localStorage.getItem("selectedBranch");

      // 🧠 Check if token exists but expired
      if (storedToken && isTokenExpired(storedToken)) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("selectedBranch");
        setUser(null);
        setToken(null);
        setSelectedBranch(null);
        router.replace("/login-page");
        return;
      }

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedToken) setToken(storedToken);
      if (storedBranch) setSelectedBranch(JSON.parse(storedBranch));
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("selectedBranch");
      setUser(null);
      setToken(null);
      setSelectedBranch(null);
    } finally {
      setLoading(false);
    }
  }, [router]);

  const login = ({ user, token }: { user: User; token: string }) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    // Admins go home immediately
    if (user.role === "admin") {
      router.replace("/");
      return;
    }

    // Single branch user → auto-select
    if (user.branches && user.branches.length === 1) {
      selectBranch(user.branches[0]);
    }
  };

  const selectBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    localStorage.setItem("selectedBranch", JSON.stringify(branch));
    router.replace("/"); // redirect to home after selection
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setSelectedBranch(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("selectedBranch");
    router.replace("/login-page");
  };

  const isAuthenticated = !!user && !!token && (user.role === "admin" || !!selectedBranch);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        selectedBranch,
        isAuthenticated,
        loading,
        login,
        logout,
        selectBranch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
