import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/solid";

import AdminTile from "../admin-tile";

export const AccessCount = AdminTile(function ({data}:any) {

    return (
        <div className="flex flex-col">
            <p>日：{data.daily}
                {
                    data.daily > data.pre_daily ?
                        <ArrowTrendingUpIcon className="ml-1 inline h-4 text-red-600" /> :
                        <ArrowTrendingDownIcon className="ml-1 inline h-4 text-green-600" />
                }
            </p>
            <p>周：{data.weekly}</p>
            <p>月：{data.monthly}</p>
            <p>总：{data.total}</p>
        </div>
    )
});