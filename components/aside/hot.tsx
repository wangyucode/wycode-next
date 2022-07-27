
import { FireIcon, TrendingDownIcon, TrendingUpIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hot({ postTitles }: { postTitles: any[] }) {

    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        fetch('https://wycode.cn/node/analysis/blogs')
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    const titleMap = new Map<string, string>(postTitles);
                    res.payload.map((post: any) => {
                        return post.title = titleMap.get(post._id);
                    });
                    console.log('get hot blog->', res);
                    setPosts(res.payload.filter((post : any) => !!post.title));
                }
            });
    }, []);

    return (
        <div className="my-4 p-2 border rounded border-slate-700/30 dark:border-slate-300/30">
            <h2 className="pb-1 mb-1 text-lg font-semibold border-b border-slate-700/30 dark:border-slate-300/30"><FireIcon className="inline h-5" /> 热门文章</h2>
            <ul>
                {posts.map(({ url, _id, title, monthly, pre_monthly}) => (
                    <li key={_id}>
                        <Link href={url}><a className="hover:text-sky-400 text-sm">• {title}
                        {
                            monthly > pre_monthly ? <TrendingUpIcon className="ml-1 inline h-4 text-red-600"/> : <TrendingDownIcon className="ml-1 inline h-4 text-green-600"/>
                        }</a></Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}