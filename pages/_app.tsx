import React, { useReducer } from 'react';
import type {AppProps} from 'next/app'
import Head from "next/head";

import '../styles/global.css';
import {SITE_NAME} from "./_document";
import reducer from '../components/reducers/app-state-reducer';


export const AppStateContext = React.createContext<any>(null);

export default function App({Component, pageProps}: AppProps) {

    const [appState, dispatch] = useReducer(reducer, {});

    return (
        <>
            <Head>
                <title>{SITE_NAME}</title>
            </Head>
            <AppStateContext.Provider value={{appState, dispatch}}>
                <Component {...pageProps} />
            </AppStateContext.Provider>
        </>
    );
}