"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";

import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/app/NavBar";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AuthProvider>
      {pathname !== "/login-page" && <Navbar />}
      <ProtectedRoute>{children}</ProtectedRoute>
    </AuthProvider>
  );
}
