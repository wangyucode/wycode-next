import { useReducer } from 'react';
import type { AppProps } from 'next/app'
import Head from "next/head";

import '../styles/global.css';
import { SITE_NAME } from "./_document";
import { AppDispatcherContext, AppStateContext, INITIAL_APP_STATE, reducer } from '../components/app-context';

export default function App({ Component, pageProps }: AppProps) {

    const [appState, dispatch] = useReducer(reducer, INITIAL_APP_STATE);

    return (
        <>
            <Head>
                <title>{SITE_NAME}</title>
            </Head>
            <AppStateContext.Provider value={appState}>
                <AppDispatcherContext.Provider value={dispatch} >
                    <Component {...pageProps} />
                </AppDispatcherContext.Provider>
            </AppStateContext.Provider>
        </>
    );
}