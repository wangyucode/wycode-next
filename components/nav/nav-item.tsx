import Link from 'next/link';
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";

export default function NavItemWithIcon(Icon: any) {

    return function ({href, title}: any) {
        const router = useRouter();

        const [active, setActive] = useState(false);

        useEffect(() => {
            setActive(router.asPath === href);
        }, []);

        return (
            <>
                <Link href={href}>
                    <a className={`flex items-center dark:hover:bg-white/5 hover:bg-black/5 px-2 py-1 rounded-md ${active && 'bg-black/20 dark:bg-white/20'}`}>
                        <Icon className='mr-1 w-5 h-5' />
                        {title}
                    </a>
                </Link>
            </>
        );
    };
}