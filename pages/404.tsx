import Layout from "../components/layout";
import {ExclamationIcon} from "@heroicons/react/outline";

export default function Custom404() {
    return (
        <Layout>
            <div className="flex flex-col h-96 items-center justify-center">
                <ExclamationIcon className="w-16"/>
                <h2>404 - 正在施工...</h2>
            </div>
        </Layout>
    );
}