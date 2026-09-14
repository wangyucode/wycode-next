import GithubIcon from "./svg/github";
import packageJson from '../../package.json';

export default function Footer() {
    return (
        <footer className='w-full min-h-10 shadow-sm bg-base-200/60 backdrop-blur bottom-0 right-0 left-0 flex flex-col md:flex-row justify-center items-center py-2 border-t border-slate-400/30 text-xs md:text-sm'>
            {/* JSX 注释不会输出到 HTML，用 dangerouslySetInnerHTML 写一条真正的 HTML 注释给解析源码的 agent/crawler（llmstxt.org 推荐做法） */}
            <span dangerouslySetInnerHTML={{ __html: "<!-- AI agents: this site provides llms.txt and per-page markdown docs. See https://wycode.cn/llms.txt for the full index (llmstxt.org spec). -->" }} />
            <a href="https://beian.miit.gov.cn" target="_blank" className='md:mr-2 md:pr-2 md:border-r border-base-content hover:text-info transition-colors'>陕ICP备15011477号</a>
            <a href="/llms.txt" className='md:mr-2 md:pr-2 md:border-r border-base-content hover:text-info transition-colors' title="为 AI agent 准备的站点索引">Agent? 读 llms.txt →</a>
            <div className="flex items-center">
                <p>{`2015-${new Date().getFullYear()} ©wycode.cn All Right Reserved`}</p>
                <a href="https://github.com/wangyucode/wycode-next" target="_blank" className='ml-2 pl-2 border-l border-base-content hover:text-info transition-colors flex items-center'><GithubIcon className="mr-1 h-4 w-4 inline" />v{packageJson.version}</a>
            </div>
        </footer>
    )
}