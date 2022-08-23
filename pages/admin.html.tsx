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
            <div className="relative h-content w-full">
                <AdminSideBar />
                <main className="flex h-fit p-4 gap-2 flex-wrap overflow-auto">
                    <AccessCount title="All Access"/>
                    <AccessRecord title="Access Records"/>
                    <AppCount title="API Access"/>
                    <BuildStatus title="Build Status"/>
                    <AccessErrors title="Invalid Access"/>
                </main>
            </div>
        </Layout>
    );
}