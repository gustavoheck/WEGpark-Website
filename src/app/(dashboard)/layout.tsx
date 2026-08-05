"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { canAccessRoute, getHomeRoute } from "@/shared/config/accessControl";
import { getSidebarItems } from "@/shared/config/sidebar";
import { AppSidebar } from "@/shared/components/organisms/AppSidebar";
import Header from "@/shared/components/organisms/Header";
import { useAuth } from "@/shared/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isReady } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const canAccessCurrentRoute = user
    ? canAccessRoute(user.currentRole, pathname)
    : false;

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!canAccessCurrentRoute) {
      router.replace(getHomeRoute(user.currentRole));
    }
  }, [canAccessCurrentRoute, isReady, router, user]);

  if (!isReady || !user || !canAccessCurrentRoute) {
    return null;
  }

  return (
    <SidebarProvider open={true}>
      <AppSidebar menuItems={getSidebarItems(user.currentRole)} />
      <SidebarInset>
        <Header />
        <main className="px-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
