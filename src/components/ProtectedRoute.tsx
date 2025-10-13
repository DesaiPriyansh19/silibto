"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated && pathname !== "/login-page") {
        router.replace("/login-page");
      }
      if (isAuthenticated && pathname === "/login-page") {
        router.replace("/");
      }
    }
  }, [isAuthenticated, loading, pathname, router]);

  if (loading) return null;
  if (!isAuthenticated && pathname !== "/login-page") return null;

  return <>{children}</>;
}
