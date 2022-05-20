import Link from 'next/link';
import {useRouter} from "next/router";
import React from "react";

export default function NavItemWithIcon(Icon: (props: React.ComponentProps<'svg'>) => JSX.Element) {

    return function ({href, title}: any) {
        const router = useRouter()

        return (
            <>
                <Link href={href}>
                    <a className={`flex items-center dark:hover:bg-white/5 hover:bg-black/5 px-2 py-1 rounded-md ${router.asPath === href && 'bg-black/20 dark:bg-white/20'}`}>
                        <Icon className='mr-1' height={15} width={15}/>
                        {title}
                    </a>
                </Link>
            </>
        );
    };
}