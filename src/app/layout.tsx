import type { Metadata } from "next";
import localFont from "next/font/local";

import Navbar from "@/components/navbar/navbar";
import "./globals.css";
import Footer from "@/components/footer";

// 加载OPPO Sans中文字体
const oppoSans = localFont({
  src: [
    {
      path: './OPPO Sans 4.0.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
});

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
    <html lang="zh-CN" data-theme="cupcake" className={`transition-colors duration-1000 ${oppoSans.className}`}>
      <body className="bg-[url('/bg.svg')] bg-cover bg-fixed flex flex-col items-center min-h-dvh">
        <Navbar />
        <main className="flex-1 pt-16 pb-10 flex flex-col lg:flex-row gap-4 w-full overflow-auto relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
