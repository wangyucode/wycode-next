import type { Metadata } from "next";

import Navbar from "@/components/navbar/navbar";
import "./globals.css";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "王郁的小站",
  description: "欢迎光临王郁的小站",
  generator: "Next.js",
  keywords: ["王郁", "缺氧", "AI", "JS", "Java"],
  creator: "王郁"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-theme="cupcake" className="transition-colors duration-1000">
      <body className="bg-[url('/bg.svg')] bg-cover bg-fixed flex flex-col items-center min-h-dvh">
        <Navbar />
        <main className="container px-4 pt-20 pb-12 flex flex-col lg:flex-row gap-4 w-full overflow-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
