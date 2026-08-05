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
    <header className="relative grid h-18 w-full grid-cols-[3rem_1fr_3rem] items-center bg-primary px-2 sm:px-4">
      <SidebarTrigger
        variant="none"
        className="col-start-1 row-start-1 h-12 w-12 text-white md:hidden"
      />

      <Link
        href={homeRoute}
        className="col-start-2 row-start-1 justify-self-center"
      >
        <Image
          src="/assets/images/logo-white.png"
          alt="Logo da WEGpark"
          height={66}
          width={98}
          loading="eager"
          className="h-auto w-20 sm:w-24"
        />
      </Link>

      {canViewNotifications ? (
        <Link
          href="/notificacoes"
          aria-label="Abrir notificações"
          className={cn(
            buttonVariants({ variant: "none", size: "icon" }),
            "col-start-3 row-start-1 h-12 w-12 justify-self-end text-white hover:bg-white/10",
          )}
        >
          <Bell className="size-7" />
        </Link>
      ) : (
        <span className="col-start-3 row-start-1" aria-hidden="true" />
      )}
    </header>
  );
}
