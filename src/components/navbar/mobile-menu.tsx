'use client'
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const isBlogPage = pathname === "/" || pathname.startsWith("/blog");

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
                {/* hamburger icon */}
                <svg
                    className="swap-off fill-current h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
                {/* close icon */}
                <svg
                    className="swap-on fill-current h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <polygon
                        points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
            </summary>
            <ul
                tabIndex={0}
                className="menu menu-sm md:menu-md dropdown-content bg-base-100 rounded-box z-1 w-48 mt-1 p-2 shadow">
                <li><Link href="/" className={isBlogPage ? "menu-active" : ""}>博客</Link></li>
                <li>
                    <a>更多</a>
                    <ul className="p-2">
                        <li><a>项目</a></li>
                        <li><a>关于</a></li>
                    </ul>
                </li>
            </ul>
        </details>
    )
}