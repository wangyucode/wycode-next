import Head from 'next/head';

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
    return <Layout>
        <Head>
            <title>{`${SITE_NAME} | ${title}`}</title>
            {tags && <meta name="keywords" content={tags.join(' ')} />}
            {excerpt && <meta name="description" content={excerpt} />}
        </Head>
        <article>
            {title}
            <br />
            {categories}
            <br />
            {tags && tags.join(', ')}
            <br />
            {date}
            <br />
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>
    </Layout>;
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