import PopularPostsAside from './popular-posts';
import Categories from './categories';
import Tags from './tags';
import About from './about';
import { PopularPostsProps } from './popular-posts';
import Ad from './ad';
import { AdSenseCard } from './adsence';

export default function Aside({ recentArticles, idTitleMap }: PopularPostsProps) {
    return (
        <aside className="flex flex-col gap-4 lg:flex-1">
            <PopularPostsAside recentArticles={recentArticles} idTitleMap={idTitleMap} />
            <Categories />
            <Tags />
            <About />
            <Ad />
            <AdSenseCard />
        </aside>
    );
}