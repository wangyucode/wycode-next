import Link from "next/link";

export default function Excerpt({excerptHtml, contentHtml, id}: any) {
    return (
        excerptHtml ? (
                <>
                    <div className="mt-4 max-w-full" dangerouslySetInnerHTML={{__html: excerptHtml}}/>
                    <Link href={`/${id}`}><a className="mt-2 font-semibold text-sky-500 hover:text-sky-400 w-fit">展开全文...</a></Link>
                </>
            )
            :
            <div className="mt-4 max-w-full" dangerouslySetInnerHTML={{__html: contentHtml}}/>
    );
}