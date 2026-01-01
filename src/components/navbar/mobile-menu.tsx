'use client'
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, BeakerIcon, ClipboardIcon, PencilIcon, UserCircleIcon, XMarkIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { MenuLinks } from "./navbar";
import DockerIcon from "../svg/docker";
import SwaggerIcon from "../svg/swagger";
import { CircleStackIcon } from "@heroicons/react/24/solid";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const isBlogPage = pathname === "/" || pathname.startsWith("/blog");
    const isClipboardPage = pathname === MenuLinks.CLIPBOARD;
    const isAppsPage = pathname === MenuLinks.APP;
    const isManagePage = pathname.startsWith("/manage");

    const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
        setIsOpen(event.currentTarget.open);
    };

    return (
        <details
            className="dropdown dropdown-end lg:hidden"
            onToggle={handleToggle}
        >
            <summary
                className={`btn btn-circle swap swap-rotate ${isOpen ? 'swap-active' : ''}`}
                title="菜单"
            >
                <Bars3Icon className="swap-off h-5 w-5" />
                <XMarkIcon className="swap-on h-5 w-5" />
            </summary>
            <ul
                tabIndex={0}
                className="menu menu-sm md:menu-md dropdown-content bg-base-100 rounded-box z-1 w-48 mt-1 p-2 shadow gap-1">
                <li><Link href={MenuLinks.HOME} className={`font-bold ${isBlogPage ? "menu-active" : ""}`}><PencilIcon className="w-4" />博客</Link></li>
                <li><Link href={MenuLinks.QINGJIN} className="font-bold" target="_blank"><img src="/apps/qingjin.png" alt="AI伴侣" className="w-4" />青衿AI</Link></li>
                <li><Link href={MenuLinks.ONI} className={`font-bold ${pathname === MenuLinks.ONI ? "menu-active" : ""}`}><img src="/apps/oni-icon.png" alt="缺氧计算器" className="w-4" />缺氧计算器</Link></li>
                <li><Link href={MenuLinks.CLIPBOARD} className={`font-bold ${isClipboardPage ? "menu-active" : ""}`}><ClipboardIcon className="w-4" />剪切板</Link></li>
                <li><Link href={MenuLinks.APP} className={`font-bold ${isAppsPage ? "menu-active" : ""}`}><BeakerIcon className="w-4" />项目</Link></li>

                {/* 管理入口二级菜单 */}
                <li>
                    <details open={isManagePage}>
                        <summary className={`font-bold flex items-center gap-1 ${isManagePage ? "menu-active" : ""}`}>
                            <Cog6ToothIcon className="w-4" />管理
                        </summary>
                        <ul className="flex flex-col mt-1 w-36 gap-1" style={{ marginTop: "4px" }}>
                            <li>
                                <Link href={MenuLinks.DOGGER} className={`font-medium ${pathname === MenuLinks.DOGGER ? "menu-active" : ""}`}>
                                    <DockerIcon className="w-4 mr-1" />Docker
                                </Link>
                            </li>
                            <li>
                                <Link href={MenuLinks.SWAGGER} className={`font-medium ${pathname === MenuLinks.SWAGGER ? "menu-active" : ""}`}>
                                    <SwaggerIcon className="w-4 mr-1" />Swagger
                                </Link>
                            </li>
                            <li>
                                <Link href={MenuLinks.SQLITE} className={`font-medium ${pathname === MenuLinks.SQLITE ? "menu-active" : ""}`}>
                                    <CircleStackIcon className="w-4 mr-1 text-orange-700" />SQLite
                                </Link>
                            </li>
                        </ul>
                    </details>
                </li>

                <li><Link href={MenuLinks.ABOUT} className={`font-bold ${pathname === MenuLinks.ABOUT ? "menu-active" : ""}`}><UserCircleIcon className="w-4" />关于我</Link></li>
            </ul>
        </details>
    )
}