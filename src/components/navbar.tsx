import Link from "next/link";
import Image from "next/image";

import icon from "@/app/icon.svg";
import ThemeToggle from "./theme-toggle";

export default function Navbar() {

    return (
        <header className="navbar shadow-sm bg-base-200/60 backdrop-blur fixed">
            <div className="navbar-start">
                <Link href="/" className="text-xl font-bold hover:text-sky-600 flex gap-1 items-center px-2">
                    <Image src={icon} alt="王郁的小站" width={32} height={32} />
                    <span className="bg-gradient-to-br dark:bg-gradient-to-tr from-sky-600 to-pink-600 dark:from-pink-400 dark:to-sky-400 bg-clip-text text-transparent">王郁的小站</span>
                </Link>
            </div>
            <nav className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-1">
                    <li><a>Item 1</a></li>
                    <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
            </nav>
            <div className="navbar-end gap-1">
                {/* search button */}
                <button className="btn btn-ghost btn-circle" title="搜索">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
                </button>
                {/* theme switch button */}
                <ThemeToggle />

                {/* mobile dropdown menu */}
                <label className="btn btn-ghost btn-circle swap lg:hidden" title="菜单">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" />

                    {/* hamburger icon */}
                    <svg
                        className="swap-off fill-current h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                    </svg>
                    {/* close icon */}
                    <nav className="swap-on dropdown dropdown-end dropdown-open">
                        <svg
                            className="fill-current h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512">
                            <polygon
                                points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                        </svg>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-4 w-52 p-2 shadow">
                            <li><a>Item 1</a></li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </nav>
                </label>
            </div>
        </header >
    )
}