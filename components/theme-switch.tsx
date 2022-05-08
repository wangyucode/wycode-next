import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { useState } from "react";

export enum Theme{
    light = 'light',
    dark = 'dark'
}

export default function ThemeSwitch() {

    const [theme, setTheme] = useState(Theme.light);

    function handleClick() {
        setTheme(theme === Theme.light ? Theme.dark : Theme.light);
    }

    return (
        <button className='mr-4 my-auto border border-slate-500 rounded-xl w-10 p-px bg-slate-200'
            onClick={handleClick}>
            <span className={classNames('flex',{'flex-row-reverse': theme === Theme.dark})}>
                {theme === Theme.light ?
                    <SunIcon height={18} width={18} className="bg-white rounded-full p-px text-amber-400" />
                    :
                    <MoonIcon height={18} width={18} className="bg-slate-900 rounded-full p-px text-amber-400" />
                }
            </span>
        </button>
    );
}