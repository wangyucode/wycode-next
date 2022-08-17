import React from "react";

import Layout from "../components/layout";
import AdminSideBar from "../components/admin-side-bar/admin-side-bar";
import { BuildStatus } from "../components/admin-tile/tiles/build-status";
import { AccessCount } from "../components/admin-tile/tiles/access-count";
import { AppCount } from "../components/admin-tile/tiles/app-count";
import { AccessRecord } from "../components/admin-tile/tiles/access-record";

export default function Admin() {

    return (
        <Layout>
            <div className="h-content w-full flex">
                <AdminSideBar />
                <main className="flex p-4 gap-2 flex-wrap overflow-auto">
                    <AccessCount title="All Access"/>
                    <AccessRecord title="Access Records"/>
                    <AppCount title="API Access"/>
                    <BuildStatus title="Build Status"/>
                </main>
            </div>
        </Layout>
    );
}