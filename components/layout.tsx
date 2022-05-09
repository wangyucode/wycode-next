import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import Navbar, { NavbarItems } from './nav/navbar';

export const SITE_NAME = '王郁的小站'

interface HomeProps {
    home: boolean;
}

export default function Layout({ children, home }: PropsWithChildren<HomeProps>) {
    return (
        <div className='text-slate-700 dark:text-slate-300'>
            <Head>
                <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
                <title>{SITE_NAME}</title>
                <meta name="description" content={`欢迎光临${SITE_NAME}`} />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(SITE_NAME)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={SITE_NAME} />
                <meta name="twitter:card" content="summary_large_image" />
                <link href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600|Open+Sans:400,600;display=swap" rel="stylesheet"></link>
            </Head>
            <header className="fixed w-full z-10 p-4 border-b border-slate-900/10 dark:border-slate-300/10 transition-colors duration-700 backdrop-blur dark:bg-slate-900/50 bg-white/10">
                <Navbar activeItem={NavbarItems.blog}/>
            </header>
            <main>{children}</main>
        </div>
    );
}