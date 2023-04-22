import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, SunIcon, XMarkIcon } from "@heroicons/react/24/outline";

import ThemeSwitch from "./theme-switch";
import {
  NavItemApps,
  NavItemBlog,
  NavItemClipboard,
  NavItemSkills,
} from "./navbar";
import { MenuLinks } from "../types";
import MobileNavItemLab from "./mobile-nav-item-lab";

export default function MobileNav() {
  return (
    <Menu as="div" className="relative md:hidden">
      {({ open }: any) => (
        <>
          <Menu.Button className="dark:hover:bg-white/5 hover:bg-black/5 px-2 py-1 rounded-md">
            {open
              ? <XMarkIcon className="w-6" />
              : <Bars3Icon className="w-6" />}
          </Menu.Button>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <nav className="absolute w-48 p-4 right-0 mt-2 bg-white rounded-lg border shadow-lg border-slate-900/10 dark:border-slate-300/10 dark:bg-slate-800 transition-colors">
              <Menu.Items as="ul">
                <Menu.Item as="li" className="mb-1">
                  <NavItemBlog href={MenuLinks.HOME} title="博客" />
                </Menu.Item>
                <MobileNavItemLab/>
                <Menu.Item as="li" className="mb-1">
                  <NavItemClipboard href={MenuLinks.CLIPBOARD} title="剪切板" />
                </Menu.Item>
                <Menu.Item as="li" className="mb-1">
                  <NavItemApps href={MenuLinks.APP} title="项目" />
                </Menu.Item>
                <Menu.Item as="li" className="mb-1">
                  <NavItemSkills href={MenuLinks.SKILLS} title="技能树" />
                </Menu.Item>
                <div className="flex justify-between px-2 pt-2 border-t border-slate-700/30 dark:border-slate-300/30">
                  <span>
                    <SunIcon
                      className="mr-1 inline"
                      height={15}
                      width={15}
                    />主题
                  </span>
                  <ThemeSwitch />
                </div>
              </Menu.Items>
            </nav>
          </Transition>
        </>
      )}
    </Menu>
  );
}
