import AdminTile from "../admin-tile";

export const BuildStatus = AdminTile(function () {
    return (
        <div className="flex flex-col gap-2">
            <a href="https://github.com/wangyucode/node-backend/actions/workflows/main.yml">
                <img
                    src="https://github.com/wangyucode/node-backend/actions/workflows/main.yml/badge.svg"
                    alt="node-backend" />
            </a>
            <a href="https://github.com/wangyucode/wycode-next/actions/workflows/main.yml">
                <img src="https://github.com/wangyucode/wycode-next/actions/workflows/main.yml/badge.svg"
                    alt="wycode-next" />
            </a>
            <a href="https://github.com/wangyucode/puppeteer-crawler/actions/workflows/leagues.yml">
                <img
                    src="https://github.com/wangyucode/puppeteer-crawler/actions/workflows/leagues.yml/badge.svg"
                    alt="League" />
            </a>
            <a href="https://github.com/wangyucode/puppeteer-crawler/actions/workflows/team.yml">
                <img
                    src="https://github.com/wangyucode/puppeteer-crawler/actions/workflows/team.yml/badge.svg"
                    alt="Team" />
            </a>
            <a href="https://github.com/wangyucode/puppeteer-crawler/actions/workflows/news.yml/badge.svg">
                <img
                    src="https://github.com/wangyucode/puppeteer-crawler/actions/workflows/news.yml/badge.svg"
                    alt="News" />
            </a>
            <a href="https://github.com/wangyucode/puppeteer-crawler/actions/workflows/hero.yml">
                <img
                    src="https://github.com/wangyucode/puppeteer-crawler/actions/workflows/hero.yml/badge.svg"
                    alt="Hero" />
            </a>
            <a href="https://github.com/wangyucode/puppeteer-crawler/actions/workflows/item.yml">
                <img
                    src="https://github.com/wangyucode/puppeteer-crawler/actions/workflows/item.yml/badge.svg"
                    alt="Item" />
            </a>
        </div>
    )
});