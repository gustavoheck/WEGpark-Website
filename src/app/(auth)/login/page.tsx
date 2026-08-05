"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { LoginFlow } from "@/features/auth/components/login/LoginFlow";
import { getHomeRoute } from "@/shared/config/accessControl";
import { useAuth } from "@/shared/context/AuthContext";
import { SystemRoleType } from "@/shared/enum/SystemRoleType";

export default function LoginPage() {
  const router = useRouter();
  const { user, isReady } = useAuth();

  useEffect(() => {
    if (isReady && user) {
      router.replace(getHomeRoute(user.currentRole));
    }
  }, [isReady, router, user]);

  function handleLoginSuccess(role: SystemRoleType) {
    router.push(getHomeRoute(role));
  }

  if (!isReady || user) {
    return null;
  }

  return <LoginFlow onLoginSuccess={handleLoginSuccess} />;
}
