import { ArchiveIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { CategoryTagPath } from "../types";

export default function CategoryComponent({ categories }: { categories: CategoryTagPath[] }) {
    return (
        <div className="my-4 p-2 border rounded border-slate-700/30 dark:border-slate-300/30">
            <h2 className="pb-1 mb-1 text-lg font-semibold border-b border-slate-700/30 dark:border-slate-300/30">
                <ArchiveIcon className="inline h-6 mb-0.5" /> 分类</h2>
            <ul>
                {categories.map(({ params: { name, count, cid } }) => (
                    <li key={cid}>
                        <Link href={`/category/${cid}`}><a className="hover:text-sky-400 text-sm">{name}
                            <span className="px-1 py-0.5 ml-2 rounded bg-black/20 dark:bg-white/20">{count}</span></a></Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}