import Link from 'next/link';
import Image from 'next/image';
import { BeakerIcon, ClipboardListIcon, CogIcon, PencilIcon, UserAddIcon } from '@heroicons/react/outline';

import { SITE_NAME } from '../layout';
import NavItem from './nav-item';
import ThemeSwitch from '../theme-switch';
import MobileNav from './mobile-nav';
import Search from '../search';


export enum NavbarItems {
    blog,
    lab,
    clipboard,
    admin,
    about
}

export const NavItemBlog = NavItem(PencilIcon);
export const NavItemLab = NavItem(BeakerIcon);
export const NavItemClipboard = NavItem(ClipboardListIcon);
export const NavItemAdmin = NavItem(CogIcon);
export const NavItemAbout = NavItem(UserAddIcon);

export default function Navbar({ activeItem }: { activeItem: NavbarItems }) {

    return (
        <div className="flex justify-between my-auto">
            <Link href="/">
                <a className='flex gap-x-2 text-xl font-semibold items-center text-slate-900 hover:text-sky-500 dark:text-white'>
                    <Image src="/favicon.svg" width={28} height={28}></Image>
                    {SITE_NAME}
                </a>
            </Link>
            <div className='flex text-slate-900 dark:text-slate-50'>
                <nav className='hidden md:flex mr-4 pr-4 border-r m-auto border-slate-900/10 dark:border-slate-300/10'>
                    <ul className='flex space-x-1 items-center'>
                        <li><NavItemBlog active={activeItem === NavbarItems.blog} href="/" title="博客" /></li>
                        <li><NavItemLab href="/lab" active={activeItem === NavbarItems.lab} title="实验室" /></li>
                        <li><NavItemClipboard href="/lab" active={activeItem === NavbarItems.clipboard} title="跨平台剪切板" /></li>
                        <li><NavItemAdmin href="/lab" active={activeItem === NavbarItems.admin} title="管理" /></li>
                        <li><NavItemAbout href="/lab" active={activeItem === NavbarItems.about} title="关于" /></li>
                    </ul>
                </nav>
                <ThemeSwitch classes="hidden md:inline mr-4" />
                <Search />
                <MobileNav activeItem={activeItem} />
            </div>
        </div>
    );
}