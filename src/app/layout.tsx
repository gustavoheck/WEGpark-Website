import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/shared/lib/utils";
import Header from "@/shared/components/organisms/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/shared/components/organisms/AppSidebar";
import SidebarItem from "@/shared/types/SidebarItem";
import { Car } from "lucide-react";
import sidebarItemsMock from "@/shared/mocks/SideBarItemsMock";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "WEGpark",
  description: "WEGpark",
};

const items = sidebarItemsMock

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn("h-full", "antialiased", "font-sans", geist.variable)}
    >
      <body>
        <SidebarProvider>
          <AppSidebar menuItems={items} />
          <Header />
          <main>
            {children}
          </main>
          <SidebarInset />
        </SidebarProvider>
      </body>
    </html>
  );
}
