import Link from "next/link";

export default function Hot({allPosts}: any) {
    return (
        <div className="my-4">
            <h2 className="text-lg font-semibold">热门文章</h2>
            <ul className="">
                {allPosts.map(({ id, data: { date, title, categories, tags }, excerptHtml, contentHtml }: any) => (
                    <li key={id}>
                        <Link href={`/${id}`}><a className="hover:text-sky-400 text-sm">{title}</a></Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}