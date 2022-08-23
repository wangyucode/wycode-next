import { useEffect, useState } from "react";
import { TrendingDownIcon, TrendingUpIcon } from "@heroicons/react/solid";
import { format } from "date-fns";

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
        <table className="border border-slate-700/30 dark:border-slate-300/30">
            <tr>
                <th>IP</th>
                <th>Status</th>
                <th>Request</th>
                <th>Agent</th>
                <th>Time</th>
            </tr>
            {errors.map((err: any) => (
                <tr className="text-sm">
                    <td className="px-2">{err.ip}</td>
                    <td className="px-2">{err.status}</td>
                    <td className="px-2 break-all">{err.request}</td>
                    <td className="px-2 break-all">{err.agent}</td>
                    <td className="px-2 w-40">{format(new Date(err.time), 'yyyy-MM-dd HH:mm:ss')}</td>
                </tr>
            ))}
        </table>
    )
});