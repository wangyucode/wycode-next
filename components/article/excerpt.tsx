import Link from "next/link";

export default function Excerpt({excerptHtml, contentHtml, id}: any) {
    return (
        excerptHtml ? (
                <>
                    <div className="mt-4 max-w-full" dangerouslySetInnerHTML={{__html: excerptHtml}}/>
                    <Link href={`/${id}`}><a className="text-sky-600 mt-2 hover:text-sky-400 w-fit">展开全文...</a></Link>
                </>
            )
            :
            <div className="mt-4 max-w-full" dangerouslySetInnerHTML={{__html: contentHtml}}/>
    );
}