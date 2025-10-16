import { getCategories } from '@/utils/posts-processor';
import Link from 'next/link';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';

export default async function Categories() {
    // 获取所有分类
    const categories = await getCategories();

    // 如果没有分类，不显示组件
    if (!categories || categories.length === 0) {
        return null;
    }

    // 生成随机背景色的函数
    const getRandomColor = (index: number) => {
        // 预定义一些柔和的颜色
        const lightColors = [
            'bg-blue-50 hover:bg-blue-100',
            'bg-green-50 hover:bg-green-100',
            'bg-purple-50 hover:bg-purple-100',
            'bg-pink-50 hover:bg-pink-100',
            'bg-yellow-50 hover:bg-yellow-100',
            'bg-red-50 hover:bg-red-100',
            'bg-cyan-50 hover:bg-cyan-100',
            'bg-indigo-50 hover:bg-indigo-100',
        ];

        const darkColors = [
            'dark:bg-blue-900/30 dark:hover:bg-blue-900/50',
            'dark:bg-green-900/30 dark:hover:bg-green-900/50',
            'dark:bg-purple-900/30 dark:hover:bg-purple-900/50',
            'dark:bg-pink-900/30 dark:hover:bg-pink-900/50',
            'dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50',
            'dark:bg-red-900/30 dark:hover:bg-red-900/50',
            'dark:bg-cyan-900/30 dark:hover:bg-cyan-900/50',
            'dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50',
        ];

        // 直接使用索引循环选择颜色
        const colorIndex = index % lightColors.length;

        // 返回适合两种模式的颜色类
        return `${lightColors[colorIndex]} ${darkColors[colorIndex]}`;
    };

    return (
        <div className="card bg-base-100 shadow-sm mb-4">
            <div className="card-body">
                <h3 className="card-title flex items-center">
                    <ArchiveBoxIcon className="mr-2 h-5 w-5" />
                    文章分类
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                    {categories.map((category, index) => (
                        <Link
                            key={category.params.cid}
                            href={`/blog/category/${category.params.cid}`}
                            className={`px-3 py-1 ${getRandomColor(index)} text-sm rounded-full`}
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