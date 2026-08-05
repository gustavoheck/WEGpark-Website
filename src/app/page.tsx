"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getHomeRoute } from "@/shared/config/accessControl";
import { useAuth } from "@/shared/context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user, isReady } = useAuth();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    router.replace(user ? getHomeRoute(user.currentRole) : "/login");
  }, [isReady, router, user]);

  return <div className="min-h-screen bg-background" aria-busy="true" />;
}
