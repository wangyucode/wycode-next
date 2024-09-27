import { useEffect, useState } from "react";


export default function Orders({ apiKey }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (apiKey) fetchOrders();
    }, [apiKey]);

    async function fetchOrders() {
        const res = await fetch("https://wycode.cn/api/v1/vending/order", { headers: { "X-API-Key": apiKey } });
        if (res.status == 200) {
            const data = await res.json();
            if (data.success) {
                setOrders(data.payload);
            }
        }
    }


    return (
        <>
            <div className="p-2">
                {orders.map(o => (
                    <div className="border-b flex items-center" key={o._id}>
                        <div className="flex text-sm p-2 gap-2 flex-wrap">
                            <strong>id: {o._id}</strong>
                            {o.amount && <div>总价： {o.amount.total/100}</div>}
                            <div>状态： {o.trade_state_desc}</div>
                            <div>创建时间： {new Date(o.createDate).toLocaleString()}</div>
                            <div>支付时间：{new Date(o.success_time).toLocaleString()}</div>
                        </div>
                    </div>
                )
                )}
            </div>
        </>

    )
}


