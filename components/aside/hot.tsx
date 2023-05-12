import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  FireIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hot({ postTitles }: { postTitles: any[] }) {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://wycode.cn/api/v1/analysis/blogs")
      .then((res) => res.json())
      .then((res) => {
        console.log("get hot blog->", res);
        if (res.success) {
          const titleMap = new Map<string, string>(postTitles);
          res.payload.map((post: any) => {
            return post.title = titleMap.get(post.key);
          });
          
          setPosts(res.payload);
        }
      });
  }, []);

  return (
    <div className="my-4 p-2 border rounded border-slate-400/30">
      <h2 className="pb-1 mb-1 text-lg font-semibold border-b border-slate-400/30">
        <FireIcon className="inline h-5" /> 热门文章TOP10 (weekly)
      </h2>
      <ul>
        {posts.map(({ key, title, pv1, pv2 }) => (
          <li key={key}>
            <Link href={`/blog/${key}`} className="hover:text-sky-400 text-sm">
              • {title}
              {pv2 >= pv1
                ? (
                  <ArrowTrendingUpIcon className="ml-1 inline h-4 text-red-600" />
                )
                : (
                  <ArrowTrendingDownIcon className="ml-1 inline h-4 text-green-600" />
                )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
