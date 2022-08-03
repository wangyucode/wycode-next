import React from "react";

import Layout from "../components/layout";
import AdminSideBar from "../components/admin-side-bar/admin-side-bar";
import { BuildStatus } from "../components/admin-tile/tiles/build-status";
import { AccessCount } from "../components/admin-tile/tiles/access-count";
import { AppCount } from "../components/admin-tile/tiles/app-count";

export default function Admin() {

    return (
        <Layout>
            <div className="h-content w-full flex">
                <AdminSideBar />
                <main className="flex p-4 gap-2 flex-wrap">
                    <AccessCount title="全站访问量"/>
                    <AppCount title="接口访问量"/>
                    <BuildStatus title="Build Status"/>
                </main>
            </div>
        </Layout>
    );
}