import { useReducer } from 'react';
import type { AppProps } from 'next/app'
import Head from "next/head";
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-hooks-web';

import '../styles/global.css';
import { AppDispatcherContext, AppStateContext, INITIAL_APP_STATE, reducer } from '../components/app-context';
import { SITE_NAME } from '../components/types';

export default function App({ Component, pageProps }: AppProps) {

    const [appState, dispatch] = useReducer(reducer, INITIAL_APP_STATE);

    const searchClient = algoliasearch('0UX0P1HN6Y', '3ee668fa206bb200656c1db5cb336220');

    return (
        <>
            <Head>
                <title>{SITE_NAME}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Head>
            <InstantSearch searchClient={searchClient} indexName="wycode">
                <AppStateContext.Provider value={appState}>
                    <AppDispatcherContext.Provider value={dispatch} >
                        <Component {...pageProps} />
                    </AppDispatcherContext.Provider>
                </AppStateContext.Provider>
            </InstantSearch>
        </>
    );
}