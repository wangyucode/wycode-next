import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import Navbar, { NavbarItems } from './nav/navbar';

export const SITE_NAME = '王郁的小站'
const name = '王郁';

interface HomeProps {
    home: boolean;
}

export default function Layout({ children, home }: PropsWithChildren<HomeProps>) {
    return (
        <div>
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
            <header>
                <Navbar activeItem={NavbarItems.blog}/>
                <Link href="/">
                    <a>
                        <Image
                            priority
                            src="/images/profile.jpg"
                            height={108}
                            width={108}
                            alt={name}
                        />
                    </a>
                </Link>
                <h2>
                    <Link href="/">
                        <a>{name}</a>
                    </Link>
                </h2>
            </header>
            <main>{children}</main>
            {!home && (
                <div>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}
        </div>
    );
}