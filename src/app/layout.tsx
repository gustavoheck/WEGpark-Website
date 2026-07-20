import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/shared/lib/utils";
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
        {children}
      </body>
    </html>
  );
}
