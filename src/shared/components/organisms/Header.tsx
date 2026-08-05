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
    <header className="grid h-18 w-full grid-cols-[3rem_1fr_3rem] items-center bg-primary px-2">
      <SidebarTrigger
        variant="none"
        className="h-12 w-12 text-white md:hidden"
      />

      <Link href={homeRoute} className="justify-self-center">
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
            "h-12 w-12 justify-self-end text-white",
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
