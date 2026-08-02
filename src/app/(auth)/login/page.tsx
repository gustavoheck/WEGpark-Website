"use client";

import { useRouter } from "next/navigation";
import { LoginFlow } from "@/features/auth/components/login/LoginFlow";
import { useAuth } from "@/shared/context/AuthContext";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/veiculos");
    }
  }, [isAuthenticated, router]);

  function handleLoginSuccess() {
    router.push("/veiculos");
  }

  if (isAuthenticated) {
    return null;
  }

  return <LoginFlow onLoginSuccess={handleLoginSuccess} />;
}