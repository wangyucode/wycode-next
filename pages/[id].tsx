import Head from 'next/head';
import { CalendarIcon, ArchiveIcon, TagIcon } from "@heroicons/react/outline";

import Layout from '../components/layout';
import { getAllPostIds, getPost, Post } from '../utils/posts';
import { SITE_NAME } from "./_document";
import Comments from "../components/comment/comments";
import Script from 'next/script';
import Highlight from '../components/highlight';

export default function PostDetail(
    {
        post:
        {
            data: { date, title, categories, tags },
            contentHtml,
            excerpt
        }
    }: { post: Post }
) {
    return (
        <Layout>
            <Head>
                <title>{`${SITE_NAME} | ${title}`}</title>
                {tags && <meta name="keywords" content={tags.join(' ')} />}
                {excerpt && <meta name="description" content={excerpt} />}
            </Head>
            <div className="p-4 max-w-7xl mx-auto">
                <article className=''>
                    <h1 className="text-2xl text-slate-800 dark:text-slate-200 font-extrabold text-center">{title}</h1>
                    <div className="flex justify-between">
                        <span className="flex items-center"><CalendarIcon className="inline mr-1" height={20} width={20} />{date}</span>
                        <span className="flex items-center"><ArchiveIcon className="inline mr-1" height={20} width={20} />{categories}</span>
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
    const post = await getPost(params.id);
    return {
        props: { post },
    };
}