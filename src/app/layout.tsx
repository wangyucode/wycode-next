import type { Metadata } from "next";
import localFont from "next/font/local";

import Navbar from "@/components/navbar/navbar";
import "./globals.css";
import Footer from "@/components/footer";
import Background from "@/components/background";

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
    <html lang="zh-CN" className={`transition-colors duration-1000 ${oppoSans.className}`}>
      <body className="flex flex-col items-center min-h-dvh">
        <Background className="fixed top-0 left-0 right-0 bottom-0 -z-10" />
        <Navbar />
        <main className="flex-1 pt-16 flex flex-col lg:flex-row gap-4 w-full overflow-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
