export default function Footer() {
    return (
        <footer className='absolute h-8 bottom-0 right-0 left-0 flex flex-col md:flex-row justify-center items-center py-2 border-t border-slate-400/30 text-xs md:text-sm'>
            <a href="https://beian.miit.gov.cn" target="_blank" className='md:mr-2 md:pr-2 md:border-r border-slate-400/30 hover:text-sky-500'>陕ICP备15011477号</a>
            <p>©wycode.cn 2015-2023 All Right Reserved</p>
        </footer>
    )
}