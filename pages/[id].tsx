import Head from 'next/head';
import { CalendarIcon, ArchiveIcon, TagIcon } from "@heroicons/react/outline";

import Layout, { SITE_NAME } from '../components/layout';
import { getAllPostIds, getPost, Post } from '../utils/posts';

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
        <article className='p-4'>
            <h1 className="text-2xl text-center font-semibold">{title}</h1>
            <span className="flex items-center"><CalendarIcon className="inline mr-1" height={20} width={20} />{date}</span>
            <span className="flex items-center"><ArchiveIcon className="inline mr-1" height={20} width={20} />{categories}</span>
            {tags && <span className="flex items-center"><TagIcon className="inline mr-1" height={20} width={20} />{tags.join(', ')}</span>}
            <div className="mt-2" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>
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