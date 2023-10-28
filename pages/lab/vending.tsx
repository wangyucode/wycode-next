import { useEffect, useState } from "react";

import Layout from "../../components/layout";
import Goods from "../../components/vending/goods";
import { Tabs, TabsProps } from "antd";
import Codes from "../../components/vending/codes";
import Orders from "../../components/vending/orders";

export default function Vending() {
    const [apiKey, setApiKey] = useState('');
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const cachedKey = localStorage.getItem("vending-api-key");
        if (cachedKey) setApiKey(cachedKey);
    }, []);

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '商品',
            children: <Goods {...{ apiKey, setApiKey, tracks, setTracks }} />
        },
        {
            key: '2',
            label: '取货码',
            children: <Codes {...{ apiKey, tracks }} />,
        },
        {
            key: '3',
            label: '订单',
            children: <Orders {...{ apiKey}} />,
        },
    ];

    return (
        <Layout>
            <Tabs items={items} centered tabBarStyle={{margin: 0}}/>
        </Layout>
    );
}