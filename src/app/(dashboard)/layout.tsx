"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/shared/components/organisms/AppSidebar";
import Header from "@/shared/components/organisms/Header";
import { getSidebarItems } from "@/shared/config/sidebar";
import { useAuth } from "@/shared/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady && !user) {
      router.replace("/login");
    }
  }, [isReady, router, user]);

  if (!isReady || !user) {
    return null;
  }

  const sidebarItems = user ? getSidebarItems(user.currentRole) : [];

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar menuItems={sidebarItems} />
      <SidebarInset>
        <Header />
        <main className="px-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
