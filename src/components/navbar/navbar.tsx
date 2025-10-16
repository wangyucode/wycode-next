import Link from "next/link";
import Image from "next/image";

import icon from "@/app/icon.svg";
import ThemeToggle from "./theme-toggle";
import MobileMenu from "./mobile-menu";
import DesktopMenu from "./desktop-menu";
import SearchButton from "./search-button";

export enum MenuLinks {
    HOME = '/',
    APP = '/apps',
    CLIPBOARD = '/clipboard',
    DASHBOARD = '/lab/dashboard',
    DOGGER = '/lab/dogger',
    CHAT = '/lab/chat',
    SWAGGER = '/lab/swagger-ui',
    MONGO = '/lab/mongo',
    ABOUT = '/about',
    VENDING = '/lab/vending',
}

export default function Navbar() {

    return (
        <header className="navbar shadow-sm bg-base-200/60 backdrop-blur fixed z-10">
            <div className="navbar-start">
                <Link href={MenuLinks.HOME} className="text-xl font-bold hover:text-sky-600 flex gap-1 items-center px-2">
                    <Image src={icon} alt="王郁的小站" width={32} height={32} />
                    <span className="bg-gradient-to-br dark:bg-gradient-to-tr from-sky-600 to-pink-600 dark:from-pink-400 dark:to-sky-400 bg-clip-text text-transparent">王郁的小站</span>
                </Link>
            </div>
            <nav className="navbar-center hidden lg:flex">
                <DesktopMenu />
            </nav>
            <div className="navbar-end gap-1">
                <SearchButton />
                <ThemeToggle />
                <MobileMenu />
            </div>
        </header >
    )
}