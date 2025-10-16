import GithubIcon from "./svg/github";

export default function Footer() {
    return (
        <footer className=' shadow-sm bg-base-200/60 backdrop-blur fixed z-10 bottom-0 right-0 left-0 flex flex-col md:flex-row justify-center items-center py-2 border-t border-slate-400/30 text-xs md:text-sm'>
            <a href="https://beian.miit.gov.cn" target="_blank" className='md:mr-2 md:pr-2 md:border-r border-base-content hover:text-info transition-colors'>陕ICP备15011477号</a>
            <div className="flex items-center">
                <p>{`2015-${new Date().getFullYear()} ©wycode.cn All Right Reserved`}</p>
                <a href="https://github.com/wangyucode/wycode-next" target="_blank" className='ml-2 pl-2 border-l border-base-content hover:text-info transition-colors'><GithubIcon className="mr-2 h-4 w-4" /></a>
            </div>

        </footer>
    )
}