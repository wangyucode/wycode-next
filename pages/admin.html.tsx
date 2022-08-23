import React from "react";

import Layout from "../components/layout";
import AdminSideBar from "../components/admin-side-bar/admin-side-bar";
import { BuildStatus } from "../components/admin-tile/tiles/build-status";
import { AccessCount } from "../components/admin-tile/tiles/access-count";
import { AppCount } from "../components/admin-tile/tiles/app-count";
import { AccessRecord } from "../components/admin-tile/tiles/access-record";
import { AccessErrors } from "../components/admin-tile/tiles/access-errors";

export default function Admin() {

    return (
        <Layout>
            <div className="absolute inset-x-0 top-16 bottom-10 flex">
                <AdminSideBar />
                <div className="p-4 flex-grow overflow-auto flex flex-wrap gap-2">
                    <AccessCount title="All Access" />
                    <AccessRecord title="Access Records" />
                    <AppCount title="API Access" />
                    <BuildStatus title="Build Status" />
                    <AccessErrors title="Invalid Access"/>
                </div>
            </div>
        </Layout>
    );
}