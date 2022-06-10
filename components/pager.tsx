import Link from "next/link";

export default function Pager({page, total}: any) {
    const previous = page === 2 ? '/' : `/page/${page - 1}`;
    const next = `/page/${page + 1}`;
    const links = ['/'];
    for (let i = 2; i <= total; i++) {
        links.push(`/page/${i}`)
    }
    return (
        <div className="flex justify-center items-center py-2 flex-wrap">
            {page > 1 && <Link href={previous}><a className="px-2 py-1 text-sky-600 hover:text-sky-400">上一页</a></Link>}
            {links.map((link, index) =>
                index === page - 1 ? <span key={index} className="px-2 py-1 rounded-md bg-black/20 dark:bg-white/20">{index + 1}</span> :
                    <Link key={index} href={link}><a className="px-2 py-1 rounded-md text-sky-600 hover:text-sky-400">{index + 1}</a></Link>
            )}
            {page < total && <Link href={next}><a className="px-2 py-1 text-sky-600 hover:text-sky-400">下一页</a></Link>}
        </div>
    );
}