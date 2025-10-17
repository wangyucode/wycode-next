'use client'
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, BeakerIcon, ClipboardIcon, PencilIcon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MenuLinks } from "./navbar";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const isBlogPage = pathname === "/" || pathname.startsWith("/blog");
    const isClipboardPage = pathname === MenuLinks.CLIPBOARD;
    const isAppsPage = pathname === MenuLinks.APP;

    const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
        setIsOpen(event.currentTarget.open);
    };

    return (
        <details
            className="dropdown dropdown-end lg:hidden"
            onToggle={handleToggle}
        >
            <summary
                className={`btn btn-ghost btn-circle swap swap-rotate ${isOpen ? 'swap-active' : ''}`}
                title="菜单"
            >
                <Bars3Icon className="swap-off h-5 w-5" />
                <XMarkIcon className="swap-on h-5 w-5" />
            </summary>
            <ul
                tabIndex={0}
                className="menu menu-sm md:menu-md dropdown-content bg-base-100 rounded-box z-1 w-48 mt-1 p-2 shadow gap-1">
                <li><Link href={MenuLinks.HOME} className={`font-bold ${isBlogPage ? "menu-active" : ""}`}><PencilIcon className="w-4" />博客</Link></li>
                <li><Link href={MenuLinks.CLIPBOARD} className={`font-bold ${isClipboardPage ? "menu-active" : ""}`}><ClipboardIcon className="w-4" />剪切板</Link></li>
                <li><Link href={MenuLinks.APP} className={`font-bold ${isAppsPage ? "menu-active" : ""}`}><BeakerIcon className="w-4" />项目</Link></li>
                <li><Link href={MenuLinks.ABOUT} className={`font-bold ${pathname === MenuLinks.ABOUT ? "menu-active" : ""}`}><UserCircleIcon className="w-4" />关于我</Link></li>
            </ul>
        </details>
    )
}