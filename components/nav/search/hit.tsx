import Link from "next/link.js";

export default function Hit({hit}: any) {
    
    return (
        <div className="mt-2">
            <Link href={`/blog/${hit.id}`} className="hover:text-sky-400">• {hit.data.title}</Link>
        </div>
    )
}