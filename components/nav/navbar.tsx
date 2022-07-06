import Link from 'next/link';
import Image from 'next/image';
import { BeakerIcon, ClipboardListIcon, CogIcon, PencilIcon} from '@heroicons/react/outline';

import { SITE_NAME } from '../../pages/_document';
import NavItem from './nav-item';
import ThemeSwitch from './theme-switch';
import MobileNav from './mobile-nav';
import Search from './search';

export const NavItemBlog = NavItem(PencilIcon);
export const NavItemLab = NavItem(BeakerIcon);
export const NavItemClipboard = NavItem(ClipboardListIcon);
export const NavItemAdmin = NavItem(CogIcon);

export default function Navbar() {

    return (
        <div className="flex grow justify-between max-w-7xl">
            <Link href="/">
                <a className='flex gap-x-2 text-xl font-semibold items-center text-slate-900 hover:text-sky-500 dark:text-white'>
                    <Image src="/favicon.svg" width={28} height={28}></Image>
                    {SITE_NAME}
                </a>
            </Link>
            <div className='flex text-slate-900 dark:text-slate-50'>
                <nav className='hidden md:flex mr-4 pr-2 border-r m-auto border-slate-700/30 dark:border-slate-300/30'>
                    <ul className='flex space-x-1 items-center'>
                        <li><NavItemBlog href="/" title="博客" /></li>
                        <li><NavItemLab href="/lab.html" title="实验室" /></li>
                        <li><NavItemClipboard href="/clipboard.html" title="剪切板" /></li>
                        <li><NavItemAdmin href="/admin" title="管理" /></li>
                    </ul>
                </nav>
                <ThemeSwitch classes="hidden md:inline mr-4" />
                <Search />
                <MobileNav />
            </div>
        </div>
    );
}