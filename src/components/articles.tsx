import Link from "next/link";
import { CalendarIcon, ArchiveBoxIcon, TagIcon } from "@heroicons/react/24/outline";

import Excerpt from "./excerpt";

export interface Article {
    id: string;
    title: string;
    date: string;
    cid: string;
    category: string;
    tags: string[];
    withExcerpt: boolean;
    excerptHtml: string;
    contentHtml: string;
}

export default function Articles({ articles }: { articles: Article[] }) {
    return (
        <section className="flex-2">
            {articles.map(({ id, title, date, cid, category, tags, withExcerpt, excerptHtml, contentHtml }) => (
                <article className="flex flex-col max-w-full">
                    <h2 className="text-2xl text-slate-800 dark:text-slate-200 font-extrabold hover:text-sky-500 mb-1"><Link href={`/blog/${id}`}>{title}</Link></h2>
                    <div className="flex justify-between">
                        <span className="flex items-center"><CalendarIcon className="inline mr-1 h-5" />{date}</span>
                        <Link href={`/blog/category/${cid}`} className="hover:text-sky-400 text-sm"><ArchiveBoxIcon className="inline mr-1 h-5 mb-0.5" />{category}</Link>
                    </div>
                    {tags && <span className="flex items-center"><TagIcon className="inline mr-1 h-5" />{tags.join(', ')}</span>}
                    {withExcerpt && <Excerpt excerptHtml={excerptHtml} id={id} contentHtml={contentHtml} />}
                </article>
            ))}
        </section>
    );
}
