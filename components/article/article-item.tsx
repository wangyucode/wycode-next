
import { ArchiveIcon, CalendarIcon, TagIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { Post } from "../../utils/posts";

export default function ArticleItem({ post, withExcerpt }: { post: Post, withExcerpt?: boolean }) {
    const { id, data: { date, title, categories, tags }, excerptHtml, contentHtml } = post;

    function Excerpt() {
        return (
            excerptHtml ? (
                <>
                    <div className="mt-2" dangerouslySetInnerHTML={{ __html: excerptHtml }} />
                    <Link href={id}><a className="text-sky-600 mt-2 hover:text-sky-500 w-fit">展开全文...</a></Link>
                </>
            )

                :
                <div className="mt-2" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        );
    }
    return (
        <article className="flex flex-col">
            <h2 className="text-lg hover:text-sky-500 mb-1"><Link href={id}>{title}</Link></h2>
            <span className="flex items-center"><CalendarIcon className="inline mr-1" height={20} width={20} />{date}</span>
            <span className="flex items-center"><ArchiveIcon className="inline mr-1" height={20} width={20} />{categories}</span>
            {tags && <span className="flex items-center"><TagIcon className="inline mr-1" height={20} width={20} />{tags.join(', ')}</span>}
            {withExcerpt && <Excerpt />}
        </article>
    );
}