
import { ArchiveIcon, CalendarIcon, TagIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { Post } from "../../utils/posts";
import Excerpt from "./excerpt";

export default function ArticleItem({ post, withExcerpt }: { post: Post, withExcerpt?: boolean }) {
    const { id, data: { date, title, categories, tags }, excerptHtml, contentHtml } = post;

    return (
        <article className="flex flex-col max-w-full">
            <h2 className="text-2xl text-slate-800 dark:text-slate-200 font-extrabold hover:text-sky-500 mb-1"><Link href={`/${id}`}>{title}</Link></h2>
            <div className="flex justify-between">
                <span className="flex items-center"><CalendarIcon className="inline mr-1" height={20} width={20} />{date}</span>
                <span className="flex items-center"><ArchiveIcon className="inline mr-1" height={20} width={20} />{categories}</span>
            </div>
            {tags && <span className="flex items-center"><TagIcon className="inline mr-1" height={20} width={20} />{tags.join(', ')}</span>}
            {withExcerpt && <Excerpt excerptHtml={excerptHtml} id={id} contentHtml={contentHtml}/>}
        </article>
    );
}