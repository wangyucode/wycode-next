
import { ArchiveBoxIcon, CalendarIcon, TagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Post } from "../types";
import Excerpt from "./excerpt";

export default function ArticleItem({ post, withExcerpt }: { post: Post, withExcerpt?: boolean }) {
    const { id, data: { date, title, category, tags }, excerptHtml, contentHtml } = post;
    const cid = post.data.category.replaceAll(" ", "-").toLowerCase();

    return (
        <article className="flex flex-col max-w-full">
            <h2 className="text-2xl text-slate-800 dark:text-slate-200 font-extrabold hover:text-sky-500 mb-1"><Link href={`/${id}.html`}>{title}</Link></h2>
            <div className="flex justify-between">
                <span className="flex items-center"><CalendarIcon className="inline mr-1 h-5"/>{date}</span>
                <Link href={`/category/${cid}`}><a className="hover:text-sky-400 text-sm"><ArchiveBoxIcon className="inline mr-1 h-5 mb-0.5"/>{category}</a></Link>
            </div>
            {tags && <span className="flex items-center"><TagIcon className="inline mr-1 h-5" />{tags.join(', ')}</span>}
            {withExcerpt && <Excerpt excerptHtml={excerptHtml} id={id} contentHtml={contentHtml}/>}
        </article>
    );
}