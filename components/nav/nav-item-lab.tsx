import { Menu, Transition } from "@headlessui/react";
import {
  BeakerIcon,
  ChevronDownIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import MongoDBIcon from "../svg/mongodb";
import { MenuLinks } from "../types";
import { NavItemLabAccess, NavItemLabMongo } from "./navbar";

export default function NavItemLab() {
  const path = useRouter().asPath;
  const buttonActive = path.startsWith("/lab");

  return (
    <Menu>
      <Menu.Button
        className={`flex items-center px-2 py-1 rounded-md ${
          buttonActive
            ? "bg-black/20 dark:bg-white/20"
            : "dark:hover:bg-white/5 hover:bg-black/5"
        }`}
      >
        <BeakerIcon className="mr-1 w-5 h-5" />实验室<ChevronDownIcon className="ml-1 w-5 h-5" />
      </Menu.Button>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="flex flex-col gap-1 absolute p-2 mt-2 bg-white rounded-lg border shadow-lg border-slate-900/10 dark:border-slate-300/10 dark:bg-slate-800 transition-colors duration-700">
          <Menu.Item>
            <NavItemLabAccess href={MenuLinks.LAB} title="访问统计" />
          </Menu.Item>
          <Menu.Item>
            <NavItemLabMongo href={MenuLinks.MONGO} title="MongoDB" />
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
