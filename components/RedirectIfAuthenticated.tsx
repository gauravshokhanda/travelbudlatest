// components/RedirectIfAuthenticated.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function RedirectIfAuthenticated({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/profile"); // or home page
    }
  }, [isLoggedIn,router]);

  if (isLoggedIn) return null;

  return <>{children}</>;
}
