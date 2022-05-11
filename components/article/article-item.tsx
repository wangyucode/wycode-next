
import Link from "next/link";
import { Post } from "../../utils/posts";

export default function ArticleItem({ post, withExcerpt }: { post: Post, withExcerpt?: boolean }) {
    const { id, data: { date, title, categories, tags }, excerptHtml, contentHtml } = post;

    function Excerpt() {
        return (
            excerptHtml ?
                <div dangerouslySetInnerHTML={{ __html: excerptHtml }} />
                :
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        );
    }
    return (
        <article>
            <Link href={id}>{title}</Link>
            <br />
            {categories}
            <br />
            {tags?.join(', ')}
            <br />
            {date}
            <br />
            {withExcerpt && <Excerpt />}
        </article>
    );
}