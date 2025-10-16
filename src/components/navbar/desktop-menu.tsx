'use client'
import { ClipboardIcon, PencilIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuLinks } from "./navbar";

export default function DesktopMenu() {
    const pathname = usePathname();
    const isBlogPage = pathname === "/" || pathname.startsWith("/blog");

    return (
        <ul className="menu menu-horizontal p-1 gap-1">
            <li ><Link href={MenuLinks.HOME} className={`font-bold ${isBlogPage ? "menu-active" : ""}`}><PencilIcon className="w-4" />博客</Link></li>
            <li ><Link href={MenuLinks.CLIPBOARD} className={`font-bold ${pathname === MenuLinks.CLIPBOARD ? "menu-active" : ""}`}><ClipboardIcon className="w-4" />剪切板</Link></li>
            <li ><Link href={MenuLinks.ABOUT} className={`font-bold ${pathname === MenuLinks.ABOUT ? "menu-active" : ""}`}><UserCircleIcon className="w-4" />关于我</Link></li>
            {/* <li>
                <details>
                    <summary>更多</summary>
                    <ul className="p-2">
                        <li><a>项目</a></li>
                        <li><a>关于</a></li>
                    </ul>
                </details>
            </li> */}
        </ul>
    )
}