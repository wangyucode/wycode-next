import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath?: string;
}

export default function Pagination({ currentPage, totalPages, basePath = '/blog/page' }: PaginationProps) {
    // 生成页码数组
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 7;

        if (totalPages <= maxVisible) {
            // 如果总页数小于等于最大显示页数，显示所有页码
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // 如果总页数大于最大显示页数，需要省略部分页码
            if (currentPage <= 4) {
                // 当前页在前面，显示前几页和最后一页
                for (let i = 1; i <= 5; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // 当前页在后面，显示第一页和后几页
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // 当前页在中间，显示第一页、当前页前后几页和最后一页
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    // 第一页的路径是 /，不是 /blog/page/1
    const getHref = (page: number) => {
        return page === 1 ? '/' : `${basePath}/${page}`;
    };

    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            {/* 上一页按钮 */}
            {prevPage && (
                <Link
                    href={getHref(prevPage)}
                    className="btn btn-sm btn-circle"
                    aria-label="上一页"
                    title='上一页'
                >
                    <ChevronLeftIcon className="w-4 h-4" />
                </Link>
            )}

            {/* 页码按钮 */}
            <div className="join">
                {pageNumbers.map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="join-item btn btn-sm btn-disabled">
                            ...
                        </span>
                    ) : (
                        <Link
                            key={page}
                            href={getHref(page as number)}
                            className={`join-item btn btn-sm ${page === currentPage
                                ? 'btn-active'
                                : ''
                                }`}
                        >
                            {page}
                        </Link>
                    )
                ))}
            </div>

            {/* 下一页按钮 */}
            {nextPage && (
                <Link
                    href={getHref(nextPage)}
                    className="btn btn-sm btn-circle"
                    aria-label="下一页"
                    title='下一页'
                >
                    <ChevronRightIcon className="w-4 h-4" />
                </Link>
            )}
        </div>
    );
}