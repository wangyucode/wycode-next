import {useContext, useEffect, useState} from "react";
import {MoonIcon, SunIcon} from "@heroicons/react/24/solid";

import { ACTIONS, AppDispatcherContext } from "../app-context";
import { Theme } from "../types";

export default function ThemeSwitch({classes}: any) {

    const [theme, setTheme] = useState(Theme.light);

    const dispatch = useContext(AppDispatcherContext);

    useEffect(getStoredTheme, []);

    function handleClick() {
        const currentTheme = theme === Theme.light ? Theme.dark : Theme.light
        changeTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    }

    function getStoredTheme() {
        const preferDarkTheme = localStorage.theme === Theme.dark ||
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        const preferredTheme = preferDarkTheme ? Theme.dark : Theme.light;
        changeTheme(preferredTheme);
    }

    function changeTheme(theme: Theme){
        setTheme(theme);
        setClass(theme);
        dispatch({type: ACTIONS.CHANGE_THEME, payload: theme});
    }

    function setClass(theme: Theme) {
        if (theme === Theme.dark) {
            document.documentElement.classList.add(Theme.dark);
        } else {
            document.documentElement.classList.remove(Theme.dark);
        }
    }

    return (
        <button
            className={`my-auto border border-slate-400/30 hover:border-sky-500 rounded-xl w-9 p-px bg-slate-500/20 duration-200 ${classes}`}
            onClick={handleClick}>
            <span className='block w-min dark:translate-x-4 transition-transform duration-200'>
                {theme === Theme.light ?
                    <SunIcon height={16} width={16} className="bg-white rounded-full p-px text-amber-400"/>
                    :
                    <MoonIcon height={16} width={16} className="bg-slate-900 rounded-full p-px text-amber-400"/>
                }
            </span>
        </button>
    );
}