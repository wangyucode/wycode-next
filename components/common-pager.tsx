export default function CommonPager({ page, size, total, maxElement, onChange }: any) {
    const pageCount = Math.floor(total / size);
    const left = Math.floor(maxElement / 2);
    let right = page + left;
    const pages = []
    for (let i = page - left; i <= page + right; i++) {
        if (i >= 0) {
            const pageElement = i === page ?
                <span className="px-2 py-1 rounded-md bg-black/20 dark:bg-white/20">{i + 1}</span> :
                <button key={i} className="px-2 py-1 rounded-md text-sky-600 hover:text-sky-400" onClick={() => onChange(i)}>{i + 1}</button>
            pages.push(pageElement);
        } else {
            right++;
        }
    }
    if (page + right < pageCount) {
        pages.push(<span className="px-2 py-1">...</span>);
        pages.push(<button key={pageCount} className="px-2 py-1 rounded-md text-sky-600 hover:text-sky-400" onClick={() => onChange(pageCount - 1)}>{pageCount}</button>);
    }

    return (
        <div className="flex justify-center items-center py-2 flex-wrap">
            {page > 0 && <button className="px-2 py-1 text-sky-600 hover:text-sky-400" onClick={() => onChange(page - 1)}>上一页</button>}
            {pages}
            {page < pageCount && <button className="px-2 py-1 text-sky-600 hover:text-sky-400" onClick={() => onChange(page + 1)}>下一页</button>}
        </div>
    );
}