"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { canAccessRoute, getHomeRoute } from "@/shared/config/accessControl";
import { useAuth } from "@/shared/context/AuthContext";
import { cn } from "@/shared/lib/utils";

export default function Header() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const homeRoute = getHomeRoute(user.currentRole);
  const canViewNotifications = canAccessRoute(
    user.currentRole,
    "/notificacoes",
  );

  return (
    <header className="bg-primary flex w-full h-18 items-center justify-between px-2 relative">
      <SidebarTrigger
        variant="none"
        className="h-12 w-12 text-white md:hidden"
      />

      <Link href={homeRoute} className="absolute left-1/2 -translate-x-1/2">
        <Image
          src="/assets/images/logo-white.png"
          alt="Logo da WEGpark"
          height={66}
          width={98}
          loading="eager"
        />
      </Link>

      {canViewNotifications ? (
        <Link
          href="/notificacoes"
          aria-label="Abrir notificações"
          className={cn(
            buttonVariants({ variant: "none", size: "icon" }),
            "flex items-center absolute right-2",
          )}
        >
          <Bell className="size-7" />
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </header>
  );
}
