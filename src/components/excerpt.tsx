import Link from "next/link";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

import { MarkdownRenderer, Post } from "@/utils/posts-processor";

export default function Excerpt({ excerpt, content, id }: Partial<Post>) {
    return (
        excerpt ? (
            <>
                <MarkdownRenderer source={excerpt} className="flex flex-col gap-2" />
                <Link href={`/blog/${id}`} className="btn btn-ghost hover:text-info justify-start">
                    <ArrowsPointingOutIcon className="inline h-5" />
                    查看全文...
                </Link>
            </>
        ) : <MarkdownRenderer source={content} className="flex flex-col gap-2" />
    );
}