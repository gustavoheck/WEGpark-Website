"use client";

import { useRouter } from "next/navigation";
import { LoginFlow } from "@/features/auth/components/organisms/LoginFlow";
import { LoginResponse } from "@/features/auth/types/loginResponse";
import { useAuth } from "@/shared/context/AuthContext";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/veiculos");
    }
  }, [isAuthenticated, router]);

  function handleLoginSuccess(response: LoginResponse) {
    login(response.token, response.role)
    router.push("/veiculos");
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <LoginFlow onLoginSuccess={handleLoginSuccess} />
  ) 

}