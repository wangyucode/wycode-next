import Link from 'next/link';
import Image from 'next/image';
import { BeakerIcon, ClipboardListIcon, CogIcon, MenuIcon, PencilIcon, SearchIcon, UserAddIcon } from '@heroicons/react/outline';

import { SITE_NAME } from '../layout';
import NavItem from './nav-item';
import ThemeSwitch from './theme-switch';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';


export enum NavbarItems {
    blog,
    lab,
    clipboard,
    admin,
    about
}

export default function Navbar({ activeItem }: { activeItem: NavbarItems }) {

    const NavItemBlog = NavItem(PencilIcon);
    const NavItemLab = NavItem(BeakerIcon);
    const NavItemClipboard = NavItem(ClipboardListIcon);
    const NavItemAdmin = NavItem(CogIcon);
    const NavItemAbout = NavItem(UserAddIcon);

    let [isOpenMobileNav, setIsOpenMobileNav] = useState(false);

    function closeModal() {
        setIsOpenMobileNav(false);
    }

    function openModal() {
        setIsOpenMobileNav(true);
    }

    return (
        <div className="flex justify-between my-auto">
            <Link href="/">
                <a className='flex gap-x-2 text-xl font-semibold items-center text-slate-900 hover:text-sky-500 dark:text-white'>
                    <Image src="/favicon.svg" width={28} height={28}></Image>
                    {SITE_NAME}
                </a>
            </Link>
            <div className='flex text-slate-900 dark:text-slate-50'>
                <nav className='hidden md:flex mr-4 pr-4 border-r m-auto border-slate-900/10 dark:border-slate-300/10 transition-colors duration-700'>
                    <ul className='flex space-x-1 items-center'>
                        <li><NavItemBlog active={activeItem === NavbarItems.blog} href="/" title="博客" /></li>
                        <li><NavItemLab href="/lab" active={activeItem === NavbarItems.lab} title="实验室" /></li>
                        <li><NavItemClipboard href="/lab" active={activeItem === NavbarItems.clipboard} title="跨平台剪切板" /></li>
                        <li><NavItemAdmin href="/lab" active={activeItem === NavbarItems.admin} title="管理" /></li>
                        <li><NavItemAbout href="/lab" active={activeItem === NavbarItems.about} title="关于" /></li>
                    </ul>
                </nav>
                <ThemeSwitch classes="hidden md:inline mr-4" />
                <button className='mr-4 md:mr-0 dark:hover:bg-white/5 hover:bg-black/5 px-2 py-1 rounded-md'>
                    <SearchIcon className='inline mr-1 h-6 w-6 md:w-4 md:h-4' height={16} width={16} />
                    <span className='hidden md:inline'>搜索</span>
                </button>
                <button
                    type="button"
                    onClick={openModal}
                    className='dark:hover:bg-white/5 hover:bg-black/5 px-2 py-1 rounded-md'
                >
                    <MenuIcon className='h-6 w-6 md:hidden' height={16} width={16} />
                </button>
                <Dialog
                    open={isOpenMobileNav}
                    onClose={closeModal}
                    className="relative z-50 p-4"
                >
                    <div className="fixed inset-0 bg-black/30 backdrop-blur" aria-hidden="true" />
                    <div className='p-4 fixed inset-0'>
                    <Dialog.Panel className="relative ml-auto max-w-sm p-4 rounded-xl bg-white dark:bg-slate-900 transition-colors duration-700">
                        <Dialog.Title>Deactivate account</Dialog.Title>
                        <Dialog.Description>
                            This will permanently deactivate your account
                        </Dialog.Description>

                        <p>
                            Are you sure you want to deactivate your account? All of your data
                            will be permanently removed. This action cannot be undone.
                        </p>

                        <button className='absolute right-4 top-4' onClick={closeModal}>Cancel</button>
                    </Dialog.Panel>
                    </div>
                </Dialog>
            </div>
        </div>
    );
}