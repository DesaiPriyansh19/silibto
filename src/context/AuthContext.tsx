"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // track initial load
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth === "true") setIsAuthenticated(true);
    setLoading(false); // done checking auth
  }, []);

  const login = () => {
    localStorage.setItem("auth", "true");
    setIsAuthenticated(true);
    router.push("/"); // redirect after login
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    router.push("/login-page");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
