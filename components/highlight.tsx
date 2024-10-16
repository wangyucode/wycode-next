import Head from "next/head";
import Script from "next/script";
import { useContext, useEffect } from "react";

import { AppStateContext } from "./app-context";
import { Theme } from "./types";

export default function Highlight() {

    const { theme } = useContext(AppStateContext);

    const styleLink = theme === Theme.dark ?
        'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/monokai.min.css'
        :
        'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/github.min.css';

    useEffect(highlight, []);

    function highlight() {
        // @ts-ignore
        window.hljs && window.hljs.highlightAll();
    }

    return (
        <>
            <Head>
                <link rel="stylesheet" href={styleLink} />
            </Head>
            <Script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/highlight.min.js"
                onLoad={highlight} />
        </>
    );
}