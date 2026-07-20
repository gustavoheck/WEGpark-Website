import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/shared/lib/utils";
import { QueryProvider } from "@/shared/providers/QueryProvider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "WEGpark",
  description: "WEGpark",
};

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
          <main>
            <QueryProvider>
              {children}
            </QueryProvider>
          </main>
      </body>
    </html>
  );
}
