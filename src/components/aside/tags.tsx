import { getTags } from '@/utils/posts-processor';
import Link from 'next/link';
import { TagIcon } from '@heroicons/react/24/outline';

export default async function Tags() {
    // 获取所有标签
    const tags = await getTags();

    // 如果没有标签，不显示组件
    if (!tags || tags.length === 0) {
        return null;
    }

    // 生成随机背景色的函数
    const getRandomColor = (tagId: string) => {
        // 使用标签ID作为种子，确保相同标签总是相同颜色
        let seed = 0;
        for (let i = 0; i < tagId.length; i++) {
            seed += tagId.charCodeAt(i);
        }

        // 预定义一些柔和的颜色，避免使用过于刺眼的颜色
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

        const index = seed % lightColors.length;

        // 返回适合两种模式的颜色类
        return `${lightColors[index]} ${darkColors[index]}`;
    };

    // 根据文章数量计算字体大小
    const getFontSize = (count: number) => {
        // 找出最大的文章数量，用于归一化
        const maxCount = Math.max(...tags.map(t => t.params.count));

        if (maxCount === 0) return 'text-sm';

        // 根据文章数量比例计算字体大小
        // 文章越多，字体越大，范围从text-xs到text-base
        const ratio = count / maxCount;
        if (ratio >= 0.8) return 'text-base';
        if (ratio >= 0.6) return 'text-sm';
        if (ratio >= 0.4) return 'text-xs';
        return 'text-xs';
    };

    return (
        <div className="card bg-base-100 shadow-sm mb-4">
            <div className="card-body">
                <h3 className="card-title flex items-center">
                    <TagIcon className="mr-2 h-5 w-5" />
                    热门标签
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Link
                            key={tag.params.cid}
                            href={`/blog/tag/${tag.params.cid}`}
                            className={`flex items-center px-3 py-1 ${getRandomColor(tag.params.cid)} ${getFontSize(tag.params.count)} rounded-full`}
                        >
                            {tag.params.name}
                            <span className="ml-1 text-xs opacity-75">({tag.params.count})</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}