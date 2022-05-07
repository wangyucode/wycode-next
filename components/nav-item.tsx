import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function NavItem({ href, title, icon }) {
    return (
        <>
            <Link href={href} >
                <a className='flex align-middle leading-6 items-center'>
                    <FontAwesomeIcon className='inline mr-1' icon={icon} height={15} width={15}/>
                    {title}
                </a>
            </Link>
        </>
    );
}