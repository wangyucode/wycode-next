import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { SITE_NAME } from './layout';


export enum NavbarItems {
    blog,
    lab,
    clipboard,
    admin,
    about
}

export default function Navbar({ activeItem }) {
    return (
        <div className="w-full z-10 p-4 flex border-b border-slate-900/10 justify-between">
            <Link href="/">
                <a className='flex gap-x-2'>
                    <Image src="/favicon.svg" width={24} height={24}></Image>
                    <span>{SITE_NAME}</span>
                </a>
            </Link>
            <div className='flex'>
                <nav className='mr-4 pr-4 border-r border-slate-900/10'>
                    <ul className='md:flex md:space-x-4'>
                        <li><FontAwesomeIcon icon={faCoffee} />博客</li>
                        <li>实验室</li>
                        <li>跨平台剪切板</li>
                        <li>管理</li>
                        <li>关于</li>
                    </ul>
                </nav>
                <div className='mr-4'>主题</div>
                <div>搜索</div>
            </div>
        </div>

    );
}