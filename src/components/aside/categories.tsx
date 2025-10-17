import { getCategories } from '@/utils/posts-processor';
import { getRandomColorById } from '@/utils/style-utils';
import Link from 'next/link';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';

export default async function Categories() {
    // 获取所有分类
    const categories = await getCategories();

    // 如果没有分类，不显示组件
    if (!categories || categories.length === 0) {
        return null;
    }

    return (
        <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
                <h3 className="card-title flex items-center">
                    <ArchiveBoxIcon className="mr-2 h-5 w-5" />
                    文章分类
                </h3>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <Link
                            key={category.params.cid}
                            href={`/blog/category/${category.params.cid}`}
                            className={`px-3 py-1 ${getRandomColorById(category.params.cid)} text-sm rounded-full`}
                        >
                            {category.params.name}
                            <span className="ml-1 text-xs opacity-75">({category.params.count})</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}