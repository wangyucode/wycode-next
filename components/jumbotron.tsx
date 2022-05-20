import Image from 'next/image';
import {SITE_NAME} from "../pages/_document";

export function Jumbotron() {
    return (
        <div className="relative h-48 md:h-96">
            <Image src="https://api.dujin.org/bing/1920.php" layout="fill" objectFit="cover"/>
            <div
                className="absolute inset-0 text-center flex justify-center gap-y-4 text-slate-900 dark:text-slate-200">
                <div
                    className='px-4 py-2 rounded-2xl backdrop-blur dark:bg-slate-900/30 bg-white/30 my-auto transition-colors duration-700'>
                    <h1 className="text-xl md:text-2xl font-semibold">欢迎光临<span
                        className="ml-2 bg-gradient-to-br from-sky-600 to-pink-600 dark:from-pink-400 dark:to-sky-400 bg-clip-text text-transparent">{SITE_NAME}</span>
                    </h1>
                    <cite className="mt-8 text-sm md:text-base">博学之、审问之、慎思之、明辨之、笃行之</cite>
                </div>
            </div>
        </div>
    );
}