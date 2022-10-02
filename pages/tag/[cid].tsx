import Head from 'next/head';
import {TagIcon} from "@heroicons/react/24/outline";

import Layout from '../../components/layout';
import { Post, SITE_NAME } from '../../components/types';
import {getPostsByTag, getTags } from '../../utils/posts';
import Link from 'next/link';

export default function TagPage({ posts, cid }: { posts: Post[], cid: string}) {
    const tag = posts[0].data.tags.find((t: string) => t.replaceAll(" ", "-").toLowerCase() === cid);
    return (
        <Layout>
            <Head>
                <title>{`${SITE_NAME} | ${tag}`}</title>
                <meta name="keywords" content={tag} />
            </Head>
            <div className="p-4 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 pb-2 mb-2 border-b border-slate-700/30 dark:border-slate-300/30">
                    <TagIcon className="inline mr-1 h-8 mb-1" />
                    {tag}
                </h1>
                <ul>
                    {posts.map(({ id, data: { title } }) => (
                        <li key={id}>
                            <Link href={`/${id}.html`}><a className="hover:text-sky-400 text-sm">• {title}</a></Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = await getTags();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: any) {
    const posts = await getPostsByTag(params.cid);
    return { props: { posts, cid: params.cid } };
}