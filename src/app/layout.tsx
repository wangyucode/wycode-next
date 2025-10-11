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
    <html lang="zh-CN" className="transition-colors duration-1000">
      <body className="bg-[url('/img/bg.svg')] bg-cover">
        <Navbar />
        <div className="container mx-auto px-4 pt-16 min-h-dvh">
          {children}
        </div>
      </body>
    </html>
  );
}
