import { useEffect, useState } from "react";
import { TrendingDownIcon, TrendingUpIcon } from "@heroicons/react/solid";

import AdminTile from "../admin-tile.jsx";
import { Access } from "../../types.js";

export const AccessErrors = AdminTile(function () {

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        fetch('https://wycode.cn/node/analysis/errors')
            .then(res => res.json())
            .then(res => {
                console.log('all->', res);
                if (res.success) {
                    setErrors(res.payload);
                }
            });
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <p>昨日：{access.daily}
                {
                    access.daily > access.pre_daily ?
                        <TrendingUpIcon className="ml-1 inline h-4 text-red-600" /> :
                        <TrendingDownIcon className="ml-1 inline h-4 text-green-600" />
                }
            </p>
            <p>上周：{access.pre_weekly}</p>
            <p>上月：{access.pre_monthly}</p>
        </div>
    )
});