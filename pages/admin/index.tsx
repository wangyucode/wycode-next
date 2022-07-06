import React from "react";

import Layout from "../../components/layout";
import AdminSideBar from "../../components/admin-side-bar/admin-side-bar";

export default function Admin() {

    return (
        <Layout>
            <div className="h-content w-full flex">
                <AdminSideBar/>
                <main className="flex-1 p-2 md:p-4 flex">
                    <div className="h-fit border rounded p-2 border-slate-700/30 dark:border-slate-300/30">
                        <h2 className="font-semibold pb-2 mb-2 border-b border-slate-700/30 dark:border-slate-300/30">Build
                            Status</h2>
                        <div className="flex flex-col gap-2">
                            <a href="https://github.com/wangyucode/node-backend/actions/workflows/main.yml">
                                <img
                                    src="https://github.com/wangyucode/node-backend/actions/workflows/main.yml/badge.svg"
                                    alt="node-backend"/>
                            </a>
                            <a href="https://github.com/wangyucode/node-proxy/actions/workflows/main.yml">
                                <img src="https://github.com/wangyucode/node-proxy/actions/workflows/main.yml/badge.svg"
                                     alt="node-proxy"/>
                            </a>
                            <a href="https://github.com/wangyucode/puppeteer-crawler/actions/workflows/leagues.yml">
                                <img
                                    src="https://github.com/wangyucode/puppeteer-crawler/actions/workflows/leagues.yml/badge.svg"
                                    alt="League"/>
                            </a>
                            <a href="https://github.com/wangyucode/puppeteer-crawler/actions/workflows/match.yml">
                                <img
                                    src="https://github.com/wangyucode/puppeteer-crawler/actions/workflows/match.yml/badge.svg"
                                    alt="Match"/>
                            </a>
                            <a href="https://github.com/wangyucode/puppeteer-crawler/actions/workflows/news.yml/badge.svg">
                                <img
                                    src="https://github.com/wangyucode/puppeteer-crawler/actions/workflows/news.yml/badge.svg"
                                    alt="News"/>
                            </a>
                            <a href="https://github.com/wangyucode/puppeteer-crawler/actions/workflows/hero.yml">
                                <img
                                    src="https://github.com/wangyucode/puppeteer-crawler/actions/workflows/hero.yml/badge.svg"
                                    alt="Hero"/>
                            </a>
                            <a href="https://github.com/wangyucode/puppeteer-crawler/actions/workflows/item.yml">
                                <img
                                    src="https://github.com/wangyucode/puppeteer-crawler/actions/workflows/item.yml/badge.svg"
                                    alt="Item"/>
                            </a>
                        </div>
                    </div>
                </main>
            </div>
        </Layout>
    );
}