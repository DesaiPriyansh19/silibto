"use client";

import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated && pathname !== "/login-page") {
      router.replace("/login-page");
    }
  }, [isAuthenticated, loading, pathname, router]);

  // Show nothing while loading auth
  if (loading) return null;

  return <>{children}</>;
}
