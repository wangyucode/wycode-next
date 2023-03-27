import React, { useContext, useEffect, Dispatch } from "react";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, PresentationChartBarIcon } from "@heroicons/react/24/outline";

import NavItemWithIcon from "../../components/nav/nav-item";
import MongoDBIcon from "../svg/mongodb";
import { ACTIONS, AppDispatcherContext, AppStateContext, AppState, AppAction } from "../app-context";
import { MenuLinks } from "../types";

export default function AdminSideBar() {

    const NavItemDashboard = NavItemWithIcon(PresentationChartBarIcon);
    const NavItemMongo = NavItemWithIcon(MongoDBIcon);

    const appState = useContext<AppState>(AppStateContext);
    const dispatch = useContext<Dispatch<AppAction>>(AppDispatcherContext);

    function setMenuStatus(open: boolean) {
        dispatch({ type: ACTIONS.TOGGLE_MENU, payload: open });
    }

    useEffect(() => {
        if (appState.openMenu === undefined) setMenuStatus(window.innerWidth > 768);
    }, [])

    function toggleOpen() {
        setMenuStatus(!appState.openMenu);
    }

    return (
        <aside
            className={`${appState.openMenu ? 'w-64 p-4' : 'w-14 p-2'} h-full flex flex-col gap-2 relative border-r border-slate-700/30 dark:border-slate-300/30 transition-all`}>
                <NavItemDashboard href={MenuLinks.LAB} title={appState.openMenu ? 'Dashboard' : ''} />
                <NavItemMongo href={MenuLinks.MONGO} title={appState.openMenu ? 'MongoDB' : ''} />
            <button
                onClick={toggleOpen}
                className="absolute inset-x-0 flex items-center justify-center bottom-0 p-2 border-t border-slate-700/30 dark:border-slate-300/30">
                {appState.openMenu ? <ChevronDoubleLeftIcon className="w-5 inline" /> :
                    <ChevronDoubleRightIcon className="w-5 inline" />
                }
            </button>
        </aside>
    );
}