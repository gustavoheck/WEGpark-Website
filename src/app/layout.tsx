import type { Metadata } from "next";
import "./globals.css";

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
      className={`h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
