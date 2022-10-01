import { useEffect, useState } from "react";
import { format } from "date-fns";

import AdminTile from "../admin-tile";
import CommonPager from "../../common-pager";

const SIZE = 20;

export const AccessErrors = AdminTile(function () {

    const [errors, setErrors] = useState([]);
    const [pagination, setPagination] = useState<any>({});

    function getErrors(page = 0) {
        fetch(`https://wycode.cn/node/analysis/errors?size=${SIZE}&page=${page}`)
            .then(res => res.json())
            .then(res => {
                console.log('errors->', res);
                if (res.success) {
                    setErrors(res.payload.items);
                    setPagination({ page: res.payload.page, size: SIZE, total: res.payload.total });
                }
            });
    }

    useEffect(getErrors, []);

    return (
        <>
            <table className="border-collapse">
                <colgroup>
                    <col className="border-r border-slate-700/30 dark:border-slate-300/30"></col>
                    <col className="border-r border-slate-700/30 dark:border-slate-300/30"></col>
                    <col className="border-r border-slate-700/30 dark:border-slate-300/30"></col>
                    <col className="border-r border-slate-700/30 dark:border-slate-300/30"></col>
                </colgroup>
                <thead className="text-xs bg-sky-200 dark:bg-sky-900">
                    <tr>
                        <th>IP</th>
                        <th className="p-2">Status</th>
                        <th>Request</th>
                        <th>Agent</th>
                        <th style={{ minWidth: '60px' }}>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {errors.map((err: any, index: number) => (
                        <tr key={index} className="text-xs odd:bg-slate-200 odd:dark:bg-slate-800 even:bg-slate-300 even:dark:bg-slate-700">
                            <td className="px-2 py-1 text-center">{err.ip}</td>
                            <td className="px-2 py-1 text-center break-words">{err.status}</td>
                            <td className="px-2 py-1 break-words" style={{ maxWidth: '300px' }}>{err.request}</td>
                            <td className="px-2 py-1" style={{ maxWidth: '500px' }}>{err.agent}</td>
                            <td className="px-2 py-1" style={{ minWidth: '88px' }}>{format(new Date(err.time), 'yyyy-MM-dd HH:mm:ss')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="text-xs">showing {errors.length} of {pagination.total} rows.</p>
            <CommonPager maxElement={10} onChange={getErrors} {...pagination} />

        </>
    )
});