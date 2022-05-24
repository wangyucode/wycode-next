import '../styles/global.css';
import type {AppProps} from 'next/app'
import Head from "next/head";
import {SITE_NAME} from "./_document";

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>{SITE_NAME}</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}