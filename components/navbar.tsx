import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPenToSquare, faClipboard } from '@fortawesome/free-regular-svg-icons'
import { faFlask, faScrewdriverWrench, faUserPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { SITE_NAME } from './layout';
import NavItem from './nav-item';


export enum NavbarItems {
    blog,
    lab,
    clipboard,
    admin,
    about
}

export default function Navbar({ activeItem }) {
    return (
        <div className="w-full z-10 p-4 flex border-b justify-between">
            <Link href="/">
                <a className='flex gap-x-2 text-xl font-semibold'>
                    <Image src="/favicon.svg" width={28} height={28}></Image>
                    {SITE_NAME}
                </a>
            </Link>
            <div className='flex'>
                <nav className='mr-4 pr-4 border-r m-auto'>
                    <ul className='md:flex md:space-x-4 items-center'>
                        <li><NavItem href="/" icon={faPenToSquare} title="博客"/></li>
                        <li><NavItem href="/lab" icon={faFlask} title="实验室"/></li>
                        <li><NavItem href="/lab" icon={faClipboard} title="跨平台剪切板"/></li>
                        <li><NavItem href="/lab" icon={faScrewdriverWrench} title="管理"/></li>
                        <li><NavItem href="/lab" icon={faUserPlus} title="关于"/></li>
                    </ul>
                </nav>
                <span className='mr-4 my-auto'>主题</span>
                <button>
                    <FontAwesomeIcon className='inline mr-1' icon={faMagnifyingGlass} height={15} width={15}/>
                    搜索
                </button>
            </div>
        </div>

    );
}