'use client'
import { usePathname } from "next/navigation";

export default function SearchButton() {
    const pathname = usePathname();
    const isBlogPage = pathname === "/" || pathname.startsWith("/blog");

    if (!isBlogPage) {
        return null;
    }

    return (
        <button className="btn btn-ghost btn-circle" title="搜索">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </button>
    )
}