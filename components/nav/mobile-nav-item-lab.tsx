import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BeakerIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { MenuLinks } from "../types";
import { NavItemLabChat, NavItemLabDogger, NavItemLabMongo, NavItemLabSwagger, NavItemLabVending } from "./navbar";

export default function MobileNavItemLab() {
  const path = useRouter().asPath;
  const buttonActive = path.startsWith("/lab");

  return (
    <Disclosure
      defaultOpen={true}
      as="div"
      className="p-1 mb-1 rounded-md border border-slate-400/30"
    >
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`flex items-center px-2 py-1 rounded-md w-full ${
              buttonActive
                ? "bg-black/20 dark:bg-white/20"
                : "dark:hover:bg-white/5 hover:bg-black/5"
            }`}
          >
            <BeakerIcon className="mr-1 w-5 h-5" />
            <span className="flex-1 text-left">实验室</span>
            <ChevronRightIcon
              className={`${
                open ? "rotate-90" : ""
              } transform duration-75 ml-1 w-5 h-5`}
            />
          </Disclosure.Button>
          <Transition
            enter="transition duration-75 ease-out"
            enterFrom="transform scale-y-0 -translate-y-1/2 opacity-0"
            enterTo="transform scale-y-100 translate-y-0 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-y-100 translate-y-0 opacity-100"
            leaveTo="transform scale-y-0 -translate-y-1/2 opacity-0"
          >
            <Disclosure.Panel className="pt-1">
              <Menu.Item as="li" className="mb-1">
                <NavItemLabChat href={MenuLinks.CHAT} title="Websocket" />
              </Menu.Item>
              {/* <Menu.Item as="li" className="mb-1">
                <NavItemLabAccess href={MenuLinks.DASHBOARD} title="Dashboard" />
              </Menu.Item> */}
            <Menu.Item as="li">
            <NavItemLabDogger href={MenuLinks.DOGGER} title="Docker UI" />
              </Menu.Item>
              <Menu.Item as="li">
                <NavItemLabSwagger href={MenuLinks.SWAGGER} title="SwaggerUI" />
              </Menu.Item>
              <Menu.Item as="li">
                <NavItemLabMongo href={MenuLinks.MONGO} title="MongoDB" />
              </Menu.Item>
              <Menu.Item as="li">
                <NavItemLabVending href={MenuLinks.VENDING} title="Vending" prefetch={false}/>
              </Menu.Item>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
