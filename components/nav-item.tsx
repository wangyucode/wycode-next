import Link from 'next/link';

export default function NavItem(Icon: (props: React.ComponentProps<'svg'>) => JSX.Element) {

    return ({ href, title, active }: any) => (
        <>
            <Link href={href} >
                <a className='flex align-middle leading-6 items-center'>
                    <Icon className='mr-1' height={15} width={15}/>
                    {title}
                </a>
            </Link>
        </>
    );
}