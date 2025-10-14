'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopMenu() {
    const pathname = usePathname();
    const isBlogPage = pathname === "/" || pathname.startsWith("/blog");

    return (
        <ul className="menu menu-horizontal p-1 gap-1">
            <li ><Link href="/" className={`font-bold ${isBlogPage ? "menu-active" : ""}`}>博客</Link></li>
            <li>
                <details>
                    <summary>更多</summary>
                    <ul className="p-2">
                        <li><a>项目</a></li>
                        <li><a>关于</a></li>
                    </ul>
                </details>
            </li>
        </ul>
    )
}