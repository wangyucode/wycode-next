import Layout from '../../components/layout';
import {getPageCount, getPagedPosts, Post} from "../../utils/posts";
import {PAGE_SIZE} from "../index";
import ArticleItem from "../../components/article/article-item";
import Pager from "../../components/pager";

export default function Page({posts, page,total}: { posts: Post[], page: number, total: number }) {
    return (
        <Layout>
            <div className="px-4 flex flex-col lg:flex-row max-w-7xl mx-auto">
                <ul className="min-w-0">
                    {posts.map(post => (
                        <li className="border-b last:border-0 border-slate-700/30 dark:border-slate-300/30 py-4 max-w-full"
                            key={post.id}>
                            <ArticleItem post={post} withExcerpt/>
                        </li>
                    ))}
                    <Pager page={page} total={total}/>
                </ul>
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const pageCount = await getPageCount(PAGE_SIZE);
    const paths = [];
    for (let i = 2; i <= pageCount; i++) {
        paths.push({
            params: {
                page: i.toString(),
            }
        });
    }
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({params}: any) {
    const page = Number.parseInt(params.page);
    const posts = await getPagedPosts(page, PAGE_SIZE);
    const total = await getPageCount(PAGE_SIZE);
    return {
        props: {posts, page,total},
    };
}