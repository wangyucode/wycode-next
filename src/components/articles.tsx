import Link from "next/link";
import { CalendarIcon, ArchiveBoxIcon, TagIcon } from "@heroicons/react/24/outline";

import Excerpt from "./excerpt";
import { Post } from "@/utils/posts-processor";

export default function Articles({ articles, withExcerpt }: { articles: Post[], withExcerpt?: boolean }) {
    return (
        <section className="flex flex-col gap-4 lg:flex-2">
            {articles.map(({ id, data: { title, date, cid, category, tags }, excerpt, content }) => (
                <article className="card bg-base-100 shadow-sm" key={id}>
                    <div className="card-body">
                        <h2 className="card-title dark:text-neutral-content hover:text-info cursor-pointer"><Link href={`/blog/${id}`}>{title}</Link></h2>
                        <div className="flex justify-between">
                            <span className="flex items-center"><CalendarIcon className="inline mr-1 h-5" />{date}</span>
                            <Link href={`/blog/category/${cid}`} className="hover:text-info text-sm"><ArchiveBoxIcon className="inline mr-1 h-5 mb-0.5" />{category}</Link>
                        </div>
                        {tags && <span className="flex items-center"><TagIcon className="inline mr-1 h-5" />{tags}</span>}
                        {withExcerpt && <Excerpt excerpt={excerpt} id={id} content={content} />}
                    </div>
                </article>
            ))}
        </section>
    );
}
