import { useEffect, useState } from "react";
import { TrendingDownIcon, TrendingUpIcon } from "@heroicons/react/solid";
import { format } from "date-fns/esm";

import AdminTile from "../admin-tile";

export const AccessErrors = AdminTile(function () {

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        fetch('https://wycode.cn/node/analysis/errors?size=10')
            .then(res => res.json())
            .then(res => {
                console.log('errors->', res);
                if (res.success) {
                    setErrors(res.payload.items);
                }
            });
    }, []);

    return (
        <table className="">
            <tr>
                <th>IP</th>
                <th>Status</th>
                <th>Request</th>
                <th>Agent</th>
                <th>Time</th>
            </tr>
            {errors.map((err: any) => (
                <tr>
                    <td>{err.ip}</td>
                    <td>{err.status}</td>
                    <td>{err.request}</td>
                    <td>{err.agent}</td>
                    <td>{format(new Date(err.time), 'yyyy-MM-dd HH:mm:ss')}</td>
                </tr>
            ))}
        </table>
    )
});