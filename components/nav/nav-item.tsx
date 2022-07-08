import React from 'react';
import Link from 'next/link';
import {useRouter} from "next/router";


export default function NavItemWithIcon(Icon: any) {

    return function ({href, title}: any) {
        const router = useRouter();

        const active = router.asPath === href;

        return (
            <>
                <Link href={href}>
                    <a className={`flex items-center px-2 py-1 rounded-md ${active ? 'bg-black/20 dark:bg-white/20': 'dark:hover:bg-white/5 hover:bg-black/5'}`}>
                        <Icon className='mr-1 w-5 h-5' />
                        {title}
                    </a>
                </Link>
            </>
        );
    };
}