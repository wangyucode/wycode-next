import Layout from '../components/layout';
import { getAllPostIds, getPost } from '../utils/posts';

export default function Post({ post: { data: { date, title, categories, tags } } }: any) {
    return <Layout>
        <article>
            {title}
            <br />
            {categories}
            <br />
            {tags.join(', ')}
            <br />
            {date}
        </article>
    </Layout>;
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: any) {
    const post = getPost(params.id);
    return {
        props: { post },
    };
}