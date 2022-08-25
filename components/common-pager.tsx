import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function CommonPager({ page, size, total, maxElement, onChange }: any) {
    const pageCount = Math.ceil(total / size);
    let left = Math.max(page - Math.floor(maxElement / 2), 0);
    let right = left + maxElement;
    if (right > pageCount) {
        left -= right - pageCount;
        left = Math.max(left, 0);
        right = Math.min(right, pageCount);
    }
    const pages = []
    for (let i = left; i < right; i++) {
        const pageElement = i === page ?
            <span className="px-2 py-1 rounded-md bg-black/20 dark:bg-white/20">{i + 1}</span> :
            <button key={i} className="px-2 py-1 rounded-md text-sky-600 hover:text-sky-400" onClick={() => onChange(i)}>{i + 1}</button>
        pages.push(pageElement);
    }
    if (left > 0) {
        left > 1 && pages.unshift(<span className="px-2 py-1">...</span>); // add ... if start page is 2
        pages.unshift(<button key={0} className="px-2 py-1 rounded-md text-sky-600 hover:text-sky-400" onClick={() => onChange(0)}>{1}</button>);
    }
    if (right < pageCount) {
        right < pageCount - 1 && pages.push(<span className="px-2 py-1">...</span>);
        pages.push(<button key={pageCount} className="px-2 py-1 rounded-md text-sky-600 hover:text-sky-400" onClick={() => onChange(pageCount - 1)}>{pageCount}</button>);
    }

    return (
        <div className="flex justify-center items-center py-2 flex-wrap">
            {page > 0 && <button className="px-2 py-1 text-sky-600 hover:text-sky-400" onClick={() => onChange(page - 1)}><ChevronLeftIcon className="w-5" /></button>}
            {pages}
            {page < pageCount - 1 && <button className="px-2 py-1 text-sky-600 hover:text-sky-400" onClick={() => onChange(page + 1)}><ChevronRightIcon className="w-5" /></button>}
        </div>
    );
}