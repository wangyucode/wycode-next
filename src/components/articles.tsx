import Link from "next/link";
import { CalendarIcon, ArchiveBoxIcon, TagIcon } from "@heroicons/react/24/outline";
import { getRandomColorById } from '@/utils/style-utils';

import Excerpt from "./excerpt";
import { Post } from "@/utils/posts-processor";

export default function Articles({ articles, withExcerpt }: { articles: Post[], withExcerpt?: boolean }) {
    return (
        <section className="flex flex-col gap-4 lg:flex-2">
            {articles.map(({ id, data: { title, date, cid, category, tags }, excerpt, content }) => (
                <article className="card bg-base-100 shadow-sm" key={id}>
                    <div className="card-body">
                        <h2 className="card-title dark:text-neutral-content hover:text-info cursor-pointer"><Link href={`/blog/${id}`}>{title}</Link></h2>
                        <div className="flex justify-between flex-wrap gap-2">
                            <span className="flex items-center"><CalendarIcon className="inline mr-1 h-5" />{date}</span>
                            <Link
                                href={`/blog/category/${cid}`}
                                className={`flex items-center px-3 py-1 ${getRandomColorById(cid)} text-sm rounded-full`}
                            >
                                <ArchiveBoxIcon className="inline mr-1 h-4 mb-0.5" />{category}
                            </Link>
                        </div>
                        {Array.isArray(tags) && tags.length > 0 && (
                            <div className="flex items-center gap-2 mt-1">
                                <TagIcon className="inline h-5" />
                                <div className="flex flex-wrap gap-1">
                                    {tags.map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/blog/tag/${tag.replaceAll(" ", "-").toLowerCase()}`}
                                            className={`px-2 ${getRandomColorById(tag)} text-sm rounded-full`}
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                        {withExcerpt && <Excerpt excerpt={excerpt} id={id} content={content} />}
                    </div>
                </article>
            ))}
        </section>
    );
}
