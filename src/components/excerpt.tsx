import Link from "next/link";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

import { MarkdownRenderer, Post } from "@/utils/posts-processor";

export default function Excerpt({ excerpt, content, id }: Partial<Post>) {
    return (
        excerpt ? (
            <>
                <MarkdownRenderer source={excerpt} className="flex flex-col gap-2" />
                <Link href={`/blog/${id}`} className="btn btn-outline font-bold text-info/80 hover:text-info">
                    <ArrowsPointingOutIcon className="inline mr-1 h-5 mb-0.5" />
                    展开全文...
                </Link>
            </>
        ) : <MarkdownRenderer source={content} className="flex flex-col gap-2" />
    );
}