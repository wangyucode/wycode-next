'use client'
import { ClipboardIcon, PencilIcon, UserCircleIcon, BeakerIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { debounce } from "lodash-es";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuLinks } from "./navbar";
import DockerIcon from "../svg/docker";
import SwaggerIcon from "../svg/swagger";
import { useState } from "react";
import { CircleStackIcon } from "@heroicons/react/24/solid";

export default function DesktopMenu() {
    const pathname = usePathname();
    const isBlogPage = pathname === "/" || pathname.startsWith("/blog");
    const isManagePage = pathname.startsWith("/manage");
    const [openSubmenu, setOpenSubmenu] = useState('');

    function handleMouseMove(name: string) {
        debounceHandleMouseLeave.cancel();
        setOpenSubmenu(name);
    }

    const debounceHandleMouseLeave = debounce((name: string) => {
        if (name !== openSubmenu) {
            return;
        }
        setOpenSubmenu("");
    }, 200);


    return (
        <ul className="menu menu-horizontal p-1 gap-1">
            <li ><Link href={MenuLinks.HOME} className={`font-bold ${isBlogPage ? "menu-active" : ""}`}><PencilIcon className="w-4" />博客</Link></li>
            <li ><Link href={MenuLinks.QINGJIN} className="font-bold" target="_blank"><img src="/apps/qingjin.png" alt="AI伴侣" className="w-4" />青衿AI</Link></li>
            <li ><Link href={MenuLinks.ONI} className={`font-bold ${pathname === MenuLinks.ONI ? "menu-active" : ""}`}><img src="/apps/oni-icon.png" alt="缺氧计算器" className="w-4" />缺氧计算器</Link></li>
            <li ><Link href={MenuLinks.CLIPBOARD} className={`font-bold ${pathname === MenuLinks.CLIPBOARD ? "menu-active" : ""}`}><ClipboardIcon className="w-4" />剪切板</Link></li>
            <li ><Link href={MenuLinks.APP} className={`font-bold ${pathname === MenuLinks.APP ? "menu-active" : ""}`}><BeakerIcon className="w-4" />项目</Link></li>

            {/* 管理入口二级菜单 */}
            <li >
                <details
                    onMouseMove={() => handleMouseMove("manage")}
                    onMouseLeave={() => debounceHandleMouseLeave("manage")}
                    open={openSubmenu === "manage"}
                >
                    <summary className={`font-bold flex items-center gap-1 ${isManagePage ? "menu-active" : ""}`}>
                        <Cog6ToothIcon className="w-4" />管理
                    </summary>
                    <ul className="flex flex-col mt-1 w-36 gap-1"
                        style={{ marginTop: "4px" }}
                        onMouseMove={() => handleMouseMove("manage")}
                        onMouseLeave={() => debounceHandleMouseLeave("manage")}
                    >
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

            <li ><Link href={MenuLinks.ABOUT} className={`font-bold ${pathname === MenuLinks.ABOUT ? "menu-active" : ""}`}><UserCircleIcon className="w-4" />关于我</Link></li>
        </ul>
    )
}