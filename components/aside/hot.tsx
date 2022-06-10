import Link from "next/link";
import {Post} from "../../utils/posts";

export default function Hot() {
    return (
        <div className="my-4">
            <h2 className="text-lg font-semibold">热门文章</h2>
            {/*<ul className="">*/}
            {/*    {allPosts.map(({ id, data: {title}}: Post) => (*/}
            {/*        <li key={id}>*/}
            {/*            <Link href={`/${id}`}><a className="hover:text-sky-400 text-sm">{title}</a></Link>*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
            正在施工...
        </div>
    );
}