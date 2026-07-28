"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/shared/components/organisms/AppSidebar";
import Header from "@/shared/components/organisms/Header";
import { getSidebarItems } from "@/shared/config/sidebar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const role = pathname.startsWith("/admin")
    ? "admin"
    : "parkuser";

  const sidebarItems = getSidebarItems(role);

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