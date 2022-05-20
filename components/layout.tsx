import { useEffect, useState } from 'react';

import Navbar from './nav/navbar';

export default function Layout({ children }: any) {

    const [isOpaque, setIsOpaque] = useState(false)

    useEffect(() => {
        const offset = 50;
        function onScroll() {
            if (!isOpaque && window.scrollY > offset) {
                setIsOpaque(true);
            } else if (isOpaque && window.scrollY <= offset) {
                setIsOpaque(false);
            }
        }
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [isOpaque])

    return (
        <div className='text-slate-700 dark:text-slate-300'>
            <header className={`fixed flex justify-center top-0 h-16 w-full z-10 p-4 border-b border-slate-700/30 dark:border-slate-300/30 transition-colors duration-700 dark:bg-slate-900/50 bg-white/10 ${isOpaque && 'backdrop-blur'}`}>
                <Navbar/>
            </header>
            <main className='pt-16 pb-10 min-h-screen relative'>
                {children}
                <footer className='flex flex-col md:flex-row justify-center items-center py-2 border-t border-slate-700/30 dark:border-slate-300/30 text-xs md:text-sm absolute inset-x-0 bottom-0'>
                    <a href="http://beian.miit.gov.cn" target="_blank" className='md:mr-2 md:pr-2 md:border-r border-slate-700/30 dark:border-slate-300/30 hover:text-sky-500'>陕ICP备15011477号</a>
                    <span>©wycode.cn 2015-2022 All Right Reserved</span>
                </footer>
            </main>
        </div>
    );
}