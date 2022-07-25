import React from "react";

import Layout from "../../components/layout";
import AdminSideBar from "../../components/admin-side-bar/admin-side-bar";
import { useRouter } from "next/router";

export default function AdminMongo() {

    return (
        <Layout>
            <div className="h-content w-full flex">
                <AdminSideBar/>
                <main className="flex-1 p-2 md:p-4 flex">
                    <iframe className="w-full" src="https://wycode.cn/mongo"></iframe>
                </main>
            </div>
        </Layout>
    );
}