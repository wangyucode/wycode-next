import React, {useContext, useEffect, useState} from "react";
import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon, PresentationChartBarIcon} from "@heroicons/react/outline";

import NavItemWithIcon from "../../components/nav/nav-item";
import MongoDBIcon from "../svg/mongodb";
import { ACTIONS, AppDispatcherContext, AppStateContext } from "../app-context";

export default function AdminSideBar() {

    const NavItemDashboard = NavItemWithIcon(PresentationChartBarIcon);
    const NavItemMongo = NavItemWithIcon(MongoDBIcon);

    const appState = useContext(AppStateContext);
    const dispatch = useContext(AppDispatcherContext);

    function setMenuStatus(open: boolean) {
        dispatch({type: ACTIONS.TOGGLE_MENU, payload: open});
    }

    useEffect(() => {
        if(appState.openMenu === undefined) setMenuStatus(window.innerWidth > 768);
    }, [])

    function toggleOpen() {
        setMenuStatus(!appState.openMenu);
    }

    return (
        <aside
            className={`relative h-full ${appState.openMenu ? 'w-64 p-4' : 'w-14 p-2'} flex flex-col gap-2 border-r border-slate-700/30 dark:border-slate-300/30 transition-all`}>
            <NavItemDashboard href="/admin" title={appState.openMenu ? 'Dashboard' : ''} />
            <NavItemMongo href="/admin/mongo" title={appState.openMenu ? 'MongoDB' : ''} />
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