import {Fragment} from "react";
import {Menu, Transition} from "@headlessui/react";
import {MenuIcon, SunIcon, XIcon} from "@heroicons/react/outline";

import ThemeSwitch from "./theme-switch";
import {NavItemAdmin, NavItemBlog, NavItemClipboard, NavItemLab} from "./navbar";

export default function MobileNav() {

    return (
        <Menu as="div" className="relative md:hidden">
            {({open}) => (
                <>
                    <Menu.Button
                        className="dark:hover:bg-white/5 hover:bg-black/5 px-2 py-1 rounded-md"
                    >
                        {
                            open ?
                                <XIcon className='h-6 w-6' height={16} width={16}></XIcon>
                                :
                                <MenuIcon className='h-6 w-6' height={16} width={16}/>
                        }
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <nav
                            className="absolute w-48 p-4 right-0 mt-2 bg-white rounded-lg border shadow-lg border-slate-900/10 dark:border-slate-300/10 dark:bg-slate-800 transition-colors duration-700">
                            <Menu.Items as='ul'>
                                <Menu.Item as='li' className="mb-1"><NavItemBlog href="/" title="博客"/></Menu.Item>
                                <Menu.Item as='li' className="mb-1"><NavItemLab href="/lab.html" title="实验室"/></Menu.Item>
                                <Menu.Item as='li' className="mb-1"><NavItemClipboard href="/clipboard.html"
                                                                                      title="剪切板"/></Menu.Item>
                                <Menu.Item as='li' className="mb-1"><NavItemAdmin href="/admin" title="管理"/></Menu.Item>
                                <div className='flex justify-between px-2 pt-2 border-t'><span><SunIcon
                                    className='mr-1 inline' height={15} width={15}/>主题</span><ThemeSwitch/></div>
                            </Menu.Items>
                        </nav>
                    </Transition>
                </>
            )}
        </Menu>
    );
}