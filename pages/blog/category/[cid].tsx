import Head from 'next/head';
import Link from 'next/link';
import {ArchiveBoxIcon} from "@heroicons/react/24/outline";

import Layout from '../../../components/layout';
import { Post, SITE_NAME } from '../../../components/types';
import { getCategories, getPostsByCategory } from '../../../utils/posts';

export default function CategoryPage({ posts }: { posts: Post[] }) {
    const category = posts[0].data.category;
    return (
        <Layout>
            <Head>
                <title>{`${SITE_NAME} | ${category}`}</title>
                <meta name="keywords" content={category} />
            </Head>
            <div className="p-4 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 pb-2 mb-2 border-b border-slate-700/30 dark:border-slate-300/30">
                    <ArchiveBoxIcon className="inline mr-1 h-8 mb-1" />
                    {category}
                </h1>
                <ul>
                    {posts.map(({ id, data: { title } }) => (
                        <li key={id}>
                            <Link href={`/blog/${id}`} className="hover:text-sky-400 text-sm">• {title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = await getCategories();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: any) {
    const posts = await getPostsByCategory(params.cid);
    return { props: { posts } };
}