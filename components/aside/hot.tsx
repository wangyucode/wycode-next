
import { FireIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hot({ postTitles }: { postTitles: any[] }) {

    const [posts, setPosts] = useState<any[]>([]);

    console.log(postTitles);

    useEffect(() => {
        fetch('https://wycode.cn/node/analysis/blogs')
            .then(res => res.json())
            .then(res => {
                console.log('get hot blog->', res);
                if (res.success) {
                    const titleMap = new Map<string, string>(postTitles);
                    res.payload.map((post: any) => {
                        return post.title = titleMap.get(post._id);
                    });
                    console.log(res.payload);
                    setPosts(res.payload);
                }
            });
    }, []);

    return (
        <div className="my-4">
            <h2 className="text-lg font-semibold"><FireIcon className="inline h-5" /> 热门文章</h2>
            <ul className="">
                {posts.map(({ url, _id, title, total }) => (
                    <li key={_id}>
                        <Link href={url}><a className="hover:text-sky-400 text-sm">{title}({total})</a></Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}