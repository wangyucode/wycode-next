import PopularPostsAside from './popular-posts';
import Categories from './categories';
import Tags from './tags';
import About from './about';
import { RecentArticle } from './popular-posts';

interface AsideProps {
    recentArticles: RecentArticle[];
}

export default function Aside({ recentArticles }: AsideProps) {
    return (
        <aside className="flex flex-col gap-4 lg:flex-1">
            <PopularPostsAside recentArticles={recentArticles} />
            <Categories />
            <Tags />
            <About />
        </aside>
    );
}