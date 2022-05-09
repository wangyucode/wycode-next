import Link from 'next/link';
import Image from 'next/image';
import { BeakerIcon, ClipboardListIcon, CogIcon, PencilIcon, SearchIcon, UserAddIcon } from '@heroicons/react/outline';

import { SITE_NAME } from '../layout';
import NavItem from './nav-item';
import ThemeSwitch from './theme-switch';


export enum NavbarItems {
    blog,
    lab,
    clipboard,
    admin,
    about
}

export default function Navbar({ activeItem }: {activeItem: NavbarItems}) {

    const NavItemBlog = NavItem(PencilIcon);
    const NavItemLab = NavItem(BeakerIcon);
    const NavItemClipboard = NavItem(ClipboardListIcon);
    const NavItemAdmin = NavItem(CogIcon);
    const NavItemAbout = NavItem(UserAddIcon);

    return (
        <div className="flex justify-between">
            <Link href="/">
                <a className='flex gap-x-2 text-xl font-semibold items-center text-slate-900 hover:text-sky-500 dark:text-white transition-colors duration-700'>
                    <Image src="/favicon.svg" width={28} height={28}></Image>
                    {SITE_NAME}
                </a>
            </Link>
            <div className='flex text-slate-900 dark:text-slate-50'>
                <nav className='mr-4 pr-4 border-r m-auto border-slate-900/10 dark:border-slate-300/10 transition-colors duration-700'>
                    <ul className='md:flex md:space-x-4 items-center'>
                        <li><NavItemBlog active={activeItem === NavbarItems.blog} href="/" title="博客"/></li>
                        <li><NavItemLab href="/lab" active={activeItem === NavbarItems.lab} title="实验室"/></li>
                        <li><NavItemClipboard href="/lab" active={activeItem === NavbarItems.clipboard} title="跨平台剪切板"/></li>
                        <li><NavItemAdmin href="/lab" active={activeItem === NavbarItems.admin} title="管理"/></li>
                        <li><NavItemAbout href="/lab" active={activeItem === NavbarItems.about} title="关于"/></li>
                    </ul>
                </nav>
                <ThemeSwitch />
                <button className='hover:text-sky-500'>
                    <SearchIcon className='inline mr-1' height={15} width={15}/>
                    搜索
                </button>
            </div>
        </div>
    );
}