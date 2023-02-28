import Head from 'next/head';
import Link from 'next/link';
import { CalendarIcon, ArchiveBoxIcon, TagIcon } from "@heroicons/react/24/outline";

import Layout from '../../components/layout';
import { getAllPostIds, getPost} from '../../utils/posts';
import Comments from "../../components/comment/comments";
import Highlight from '../../components/highlight';
import { Post, SITE_NAME } from '../../components/types';

export default function PostDetail({post}: { post: Post }) {
    const { id, data: { date, title, category, tags }, excerpt, contentHtml } = post;
    const cid = post.data.category.replaceAll(" ", "-").toLowerCase();

    return (
        <Layout>
            <Head>
                <title>{`${SITE_NAME} | ${title}`}</title>
                {tags && <meta name="keywords" content={tags.join(' ')} />}
                {excerpt && <meta name="description" content={excerpt} />}
            </Head>
            <div className="p-4 max-w-7xl mx-auto">
                <article>
                    <h1 className="text-2xl text-slate-800 dark:text-slate-200 font-extrabold text-center">{title}</h1>
                    <div className="flex justify-between">
                        <span className="flex items-center"><CalendarIcon className="inline mr-1" height={20} width={20} />{date}</span>
                        <Link href={`/blog/category/${cid}`} className="hover:text-sky-400 text-sm"><ArchiveBoxIcon className="inline mr-1 h-5 mb-0.5"/>{category}</Link>
                    </div>
                    {tags && <span className="flex items-center"><TagIcon className="inline mr-1" height={20} width={20} />{tags.join(', ')}</span>}
                    <div className="mt-8" dangerouslySetInnerHTML={{ __html: contentHtml }} />
                </article>
                <Comments />
            </div>
            <Highlight/>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = await getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: any) {
    const post = await getPost(params.pid);
    return {
        props: { post },
    };
}