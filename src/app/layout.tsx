import type { Metadata } from "next";

import Navbar from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "王郁的小站",
  description: "欢迎光临王郁的小站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="transition-colors duration-500">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
