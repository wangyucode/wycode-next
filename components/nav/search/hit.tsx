import Link from "next/link.js";
import {Highlight} from 'react-instantsearch-hooks-web';

export default function Hit({hit}: any) {
    return (
        <div className="mt-2">
            <Link href={hit.id}><a className="hover:text-sky-400">• {hit.data.title}
            </a></Link>
        </div>
    )
}