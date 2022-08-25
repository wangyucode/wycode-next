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
        <table className="border-collapse">
            <colgroup>
                <col className="border-r border-slate-700/30 dark:border-slate-300/30"></col>
                <col className="border-r border-slate-700/30 dark:border-slate-300/30"></col>
                <col className="border-r border-slate-700/30 dark:border-slate-300/30"></col>
                <col className="border-r border-slate-700/30 dark:border-slate-300/30"></col>
            </colgroup>
            <thead className="bg-sky-100 dark:bg-sky-900">
                <tr>
                    <th>IP</th>
                    <th className="p-2">Status</th>
                    <th>Request</th>
                    <th>Agent</th>
                    <th  style={{minWidth: '60px'}}>Time</th>
                </tr>
            </thead>
            <tbody>
                {errors.map((err: any, index: number) => (
                    <tr className={`text-sm ${index % 2 === 0 ? 'bg-slate-100 dark:bg-slate-800' : 'bg-slate-200 dark:bg-slate-700'}`}>
                        <td className="px-2">{err.ip}</td>
                        <td className="px-2 break-words">{err.status}</td>
                        <td className="px-2 break-words">{err.request}</td>
                        <td className="px-2">{err.agent}</td>
                        <td className="px-2"  style={{minWidth: '100px'}}>{format(new Date(err.time), 'yyyy-MM-dd HH:mm:ss')}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
});