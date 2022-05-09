import Image from 'next/image';

import styles from '../styles/components/jumbotron.module.css';
import { SITE_NAME } from './layout';

export function Jumbotron() {
    return (
        <div className="relative">
            <Image width={1280} height={400} src="https://api.dujin.org/bing/1920.php" layout="responsive" objectFit="cover" />
            <div className="absolute inset-0 text-center flex flex-col justify-center gap-y-4 text-slate-900 dark:text-slate-200 welcome">
                <h1 className="text-2xl mt-16 font-semibold">欢迎光临<span className="ml-2 bg-gradient-to-br from-sky-500 to-pink-500 bg-clip-text text-transparent">{SITE_NAME}</span></h1>
                <cite className="">博学之、审问之、慎思之、明辨之、笃行之</cite>
            </div>
            <style jsx global>{`
                .welcome {
                    text-shadow: 0 0 8px white;
                }
                .dark .welcome {
                    text-shadow: 0 0 8px black;
                }
                .welcome span{
                    text-shadow: none;
                }
            `}
            </style>


        </div>
    );
}