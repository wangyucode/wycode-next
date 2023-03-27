import {LinkIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import GithubIcon from "../svg/github";

export default function AppLink({href}: any) {
    const external: boolean = href.startsWith('http');
    const github: boolean = href.startsWith('https://github.com');
    return (
        <>
            {external ?
                <a href={href} target="_blank" className="text-sky-600 hover:text-sky-400 block break-all mb-2">
                    {github? <GithubIcon className="w-4 inline mr-1"/> : <LinkIcon className="w-4 inline mr-1"/>}
                    {href}
                </a>
                :
                <Link href={href} className="text-sky-600 hover:text-sky-400 block break-all mb-2"><LinkIcon className="w-4 inline mr-1"/>{href.replace(/.*\//, '')}</Link>
            }
        </>
    );
}