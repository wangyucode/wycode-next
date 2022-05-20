import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

export enum Theme {
    light = 'light',
    dark = 'dark'
}

export default function ThemeSwitch({ classes }: any) {

    const [theme, setTheme] = useState(Theme.light);

    useEffect(getStoredTheme, []);

    function handleClick() {
        const currentTheme = theme === Theme.light ? Theme.dark : Theme.light
        setTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
        setClass(currentTheme);
    }

    function getStoredTheme() {
        const perferDarkTheme = localStorage.getItem('theme') === Theme.dark ||
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)'));
        const perferredTheme = perferDarkTheme ? Theme.dark : Theme.light;
        setTheme(perferredTheme);
        setClass(perferredTheme);
    }

    function setClass(theme: Theme) {
        if (theme === Theme.dark) {
            document.documentElement.classList.add(Theme.dark);
        } else {
            document.documentElement.classList.remove(Theme.dark);
        }
    }

    return (
        <button className={`my-auto border border-slate-500 hover:border-sky-500 rounded-xl w-9 p-px bg-slate-300/50 dark:bg-slate-600/50 duration-200 ${classes}`}
            onClick={handleClick}>
            <span className='flex dark:translate-x-4 transition-transform duration-200'>
                {theme === Theme.light ?
                    <SunIcon height={16} width={16} className="bg-white rounded-full p-px text-amber-400" />
                    :
                    <MoonIcon height={16} width={16} className="bg-slate-900 rounded-full p-px text-amber-400" />
                }
            </span>
        </button>
    );
}