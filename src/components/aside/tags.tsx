import { getTags } from '@/utils/posts-processor';
import { getRandomColorById } from '@/utils/style-utils';
import Link from 'next/link';
import { TagIcon } from '@heroicons/react/24/outline';

export default async function Tags() {
    // 获取所有标签
    const tags = await getTags();

    // 如果没有标签，不显示组件
    if (!tags || tags.length === 0) {
        return null;
    }

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
        <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
                <h3 className="card-title flex items-center">
                    <TagIcon className="mr-2 h-5 w-5" />
                    标签分类
                </h3>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Link
                            key={tag.params.cid}
                            href={`/blog/tag/${tag.params.cid}`}
                            className={`flex items-center px-3 py-1 ${getRandomColorById(tag.params.cid)} ${getFontSize(tag.params.count)} rounded-full`}
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