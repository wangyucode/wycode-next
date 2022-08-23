import { useEffect, useState } from "react";
import { TrendingDownIcon, TrendingUpIcon } from "@heroicons/react/solid";

import AdminTile from "../admin-tile";
import { Access } from "../../types";

export const AccessCount = AdminTile(function () {

    const [access, setAccess] = useState<Access>({} as Access);

    useEffect(() => {
        fetch('https://wycode.cn/node/analysis/all')
            .then(res => res.json())
            .then(res => {
                console.log('all->', res);
                if (res.success) {
                    setAccess(res.payload);
                }
            });
    }, []);

    return (
        <div className="flex flex-col">
            <p>昨日：{access.daily}
                {
                    access.daily > access.pre_daily ?
                        <TrendingUpIcon className="ml-1 inline h-4 text-red-600" /> :
                        <TrendingDownIcon className="ml-1 inline h-4 text-green-600" />
                }
            </p>
            <p>上周：{access.pre_weekly}</p>
            <p>上月：{access.pre_monthly}</p>
            <p>去年：{access.pre_yearly}</p>
            <p>今年：{access.yearly}</p>
            <p>累计：{access.total}</p>
        </div>
    )
});