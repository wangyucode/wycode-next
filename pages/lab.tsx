import React, { useEffect, useState } from "react";

import Layout from "../components/layout";
import AdminSideBar from "../components/admin-side-bar/admin-side-bar";
import { BuildStatus } from "../components/admin-tile/tiles/build-status";
import { AccessCount } from "../components/admin-tile/tiles/access-count";
import { AppCount } from "../components/admin-tile/tiles/app-count";
import { AccessRecord } from "../components/admin-tile/tiles/access-record";
import { AccessErrors } from "../components/admin-tile/tiles/access-errors";

export default function Admin() {

    const [data, setData] = useState({records:[]});

    useEffect(() => {
        fetch('https://wycode.cn/node/analysis/records')
            .then(res => res.json())
            .then(res => {
                console.log('records->', res);
                if (res.success) {
                    setData(res.payload);
                }
            });
    }, []);

    return (
        <Layout>
            <div className="absolute inset-x-0 top-16 bottom-10 flex">
                <AdminSideBar />
                <div className="p-4 flex-grow overflow-auto flex flex-wrap gap-2 relative">
                    <AccessRecord title="Access Records" data={data.records} />
                    <AccessCount title="All Access" data={data} />
                    <AppCount title="API Access" />
                    <BuildStatus title="Build Status" />
                    <AccessErrors title="Invalid Access"/>
                </div>
            </div>
        </Layout>
    );
}