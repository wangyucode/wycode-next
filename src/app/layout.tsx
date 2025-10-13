import type { Metadata } from "next";

import Navbar from "@/components/navbar";
import "./globals.css";
import Footer from "@/components/footer";

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
    <html lang="zh-CN" data-theme="cupcake" className="transition-colors duration-1000">
      <body className="bg-[url('/img/bg.svg')] bg-cover">
        <Navbar />
        <main className="container mx-auto px-4 pt-20 pb-12 min-h-dvh">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
