import Link from "next/link";
import { TagIcon } from "@heroicons/react/24/outline";

import { CategoryTagPath } from "../types";

const TAG_COLORS = [
    'text-pink-500',
    'text-orange-500',
    'text-yellow-500',
    'text-green-500',
    'text-cyan-500',
    'text-blue-500',
    'text-purple-500',
];

export default function Tags({ tags }: { tags: CategoryTagPath[] }) {

    return (
        <div className="my-4 p-2 border rounded border-slate-700/30 dark:border-slate-300/30">
            <h2 className="pb-1 mb-1 text-lg font-semibold border-b border-slate-700/30 dark:border-slate-300/30">
                <TagIcon className="inline h-6 mb-0.5" /> 标签</h2>
            <ul className="flex flex-wrap gap-x-2">
                {tags.map(({ params }) => (
                    <Tag {...params} key={params.cid}></Tag>
                ))}
            </ul>
        </div>
    );
}

function Tag({name, count, cid}: {name: string, count: number, cid: string}) {
    const color = TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length) % TAG_COLORS.length];
    const size = 6+count*2;
    return (
        <li >
            <Link href={`/blog/tag/${cid}`} style={{fontSize: `${size}px`, lineHeight: `${size}px`}} className={`px-1 py-0.5 rounded ${color} hover:bg-black/20 hover:dark:bg-white/20 text-sm`}>{name}({count})</Link>
        </li>
    );
}