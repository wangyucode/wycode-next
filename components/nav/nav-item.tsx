import Link from 'next/link';

export default function NavItem(Icon: (props: React.ComponentProps<'svg'>) => JSX.Element) {

    return ({ href, title, active }: any) => (
        <>
            <Link href={href} >
                <a className={`flex box-content align-middle leading-6 items-center dark:hover:bg-white/5 hover:bg-black/5 px-2 py-1 rounded-md ${active ? 'bg-black/20 dark:bg-white/20' : ''}`}>
                    <Icon className='mr-1' height={15} width={15} />
                    {title}
                </a>
            </Link>
        </>
    );
}