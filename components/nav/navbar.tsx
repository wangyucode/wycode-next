import Link from "next/link";
import { useRouter } from "next/router";

import {
  ClipboardDocumentIcon,
  PencilIcon,
  PresentationChartLineIcon,
  Squares2X2Icon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

import NavItem from "./nav-item";
import ThemeSwitch from "./theme-switch";
import MobileNav from "./mobile-nav";
import Search from "./search/search";
import { MenuLinks, SITE_NAME } from "../types";
import NavItemLab from "./nav-item-lab";
import MongoDBIcon from "../svg/mongodb";
import SwaggerIcon from "../svg/swagger";

export const NavItemBlog = NavItem(PencilIcon);
export const NavItemLabAccess = NavItem(PresentationChartLineIcon);
export const NavItemLabSwagger = NavItem(SwaggerIcon);
export const NavItemLabMongo = NavItem(MongoDBIcon);
export const NavItemClipboard = NavItem(ClipboardDocumentIcon);
export const NavItemApps = NavItem(Squares2X2Icon);
export const NavItemAbout = NavItem(UserPlusIcon);

export default function Navbar() {
  const path = useRouter().asPath;
  const hasSearch = path === MenuLinks.HOME || path.startsWith("/blog");

  return (
    <div className="flex grow justify-between max-w-7xl">
      <Link
        href="/"
        className="flex gap-x-2 text-xl font-semibold items-center text-slate-900 hover:text-sky-500 dark:text-white"
      >
        <img src="/favicon.svg" width={28} height={28}></img>
        {SITE_NAME}
      </Link>
      <div className="flex text-slate-900 dark:text-slate-50">
        <nav className="hidden md:flex mr-4 pr-2 border-r m-auto border-slate-700/30 dark:border-slate-300/30">
          <ul className="flex space-x-1 items-center">
            <li>
              <NavItemBlog href={MenuLinks.HOME} title="博客" />
            </li>
            <li>
              <NavItemLab />
            </li>
            <li>
              <NavItemClipboard href={MenuLinks.CLIPBOARD} title="剪切板" />
            </li>
            <li>
              <NavItemApps href={MenuLinks.APP} title="小程序" />
            </li>
            <li>
              <NavItemAbout href={MenuLinks.ABOUT} title="关于" />
            </li>
          </ul>
        </nav>
        <ThemeSwitch classes="hidden md:inline mr-4" />
        {hasSearch && <Search />}
        <MobileNav />
      </div>
    </div>
  );
}
