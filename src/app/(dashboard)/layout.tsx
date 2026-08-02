"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/shared/components/organisms/AppSidebar";
import Header from "@/shared/components/organisms/Header";
import { getSidebarItems } from "@/shared/config/sidebar";
import { useAuth } from "@/shared/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
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
