import { useEffect, useState } from "react";

import Layout from "../../components/layout";
import { Tab } from "@headlessui/react";
import Goods from "../../components/vending/goods";
import { Menu, Tabs, TabsProps } from "antd";

export default function Vending() {

    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        const cachedKey = localStorage.getItem("vending-api-key");
        if (cachedKey) setApiKey(cachedKey);
    }, []);

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '商品',
            children: <Goods {...{ apiKey, setApiKey }} />
        },
        {
            key: '2',
            label: '取货码',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: '订单',
            children: 'Content of Tab Pane 3',
        },
    ];

    return (
        <Layout>
            <Tabs items={items} centered/>
        </Layout>
    );
}