import { Metadata } from 'next';
import { UserIcon } from '@heroicons/react/24/outline';
import { getRandomColorById } from '@/utils/style-utils';
import GithubIcon from '@/components/svg/github';
import WechatIcon from '@/components/svg/wechat';
import SkillChart from './skill-chart';
import { SKILLS_OPTION } from './skills';
import Comments from '@/components/comments';

export default function AboutPage() {
    const skills = Array.isArray(SKILLS_OPTION.series) && SKILLS_OPTION.series[0]?.data?.filter((it: any) => it.category) || [];
    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 主要内容区域 */}
                <div className="lg:col-span-2">

                    {/* 个人简介卡片 */}
                    <div className="card bg-base-100 shadow-lg mb-6">
                        <div className="card-body">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <img src="/about/photo.png" alt="照片" className="w-32 h-32 rounded-full" />
                                <div className="text-center md:text-left">
                                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">王郁</h1>
                                    <p className="text-lg mt-2 text-slate-600 dark:text-slate-400">熟悉JavaScript生态和Java生态以及Unity3D开发</p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                    独立完成从Linux服务器、容器、数据库、后端服务到全平台前端页面的开发。同时正在积极拥抱AI。
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 技能卡片 - graph chart */}
                    <SkillChart />

                    <Comments />
                </div>

                {/* 侧边栏 - 包含联系信息 */}
                <div className="lg:col-span-1">
                    {/* 联系卡片 */}
                    <div className="card bg-base-100 shadow-sm mb-6">
                        <div className="card-body">
                            <h3 className="card-title flex items-center mb-4">
                                <UserIcon className="mr-2 h-5 w-5" /> 联系我
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <p>
                                        邮件：
                                        <a
                                            href="mailto:wangyu@wycode.cn"
                                            title="wangyu@wycode.cn"
                                            className="ml-1 font-semibold text-sky-500 hover:text-sky-400 dark:hover:text-sky-300 transition-colors"
                                        >
                                            wangyu@wycode.cn
                                        </a>
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <GithubIcon className="h-5 mr-3 mt-0.5 flex-shrink-0" />
                                    <p>
                                        GitHub：
                                        <a
                                            href="https://github.com/wangyu-wycode"
                                            title="github"
                                            className="ml-1 font-semibold text-sky-500 hover:text-sky-400 dark:hover:text-sky-300 transition-colors"
                                        >
                                            https://github.com/wangyu-wycode
                                        </a>
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center">
                                        <WechatIcon className="w-5 h-5 mr-3 text-green-500" />
                                        <p>微信：</p>
                                    </div>
                                    <img
                                        src="/about/wechat.jpg"
                                        alt="微信二维码"
                                        className="w-full max-w-48 mx-auto p-2 border rounded border-slate-300 dark:border-slate-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 技术栈标签 */}
                    <div className="card bg-base-100 shadow-sm mb-6">
                        <div className="card-body">
                            <h3 className="card-title flex items-center mb-4">
                                <GithubIcon className="mr-2 h-5 w-5" /> 技术栈
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {/* 按category分类显示技能 */}
                                <div className="space-y-4">
                                    {['在用', '用过', '偶尔用'].map((category) => {
                                        // 获取当前类别的技能并按照symbolSize从大到小排序
                                        const categorySkills = skills
                                            .filter((skill): skill is { category: string, symbolSize: number, name: string } => typeof skill === 'object' && skill !== null && 'category' in skill && skill.category === category)
                                            .sort((a, b) => (b.symbolSize || 0) - (a.symbolSize || 0));
                                        if (categorySkills.length === 0) return null;

                                        // 根据类别获取颜色类
                                        let colorClass = '';
                                        let titleColorClass = '';
                                        switch (category) {
                                            case '在用':
                                                colorClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
                                                titleColorClass = 'font-semibold text-green-600 dark:text-green-400';
                                                break;
                                            case '用过':
                                                colorClass = 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100';
                                                titleColorClass = 'font-semibold text-orange-600 dark:text-orange-400';
                                                break;
                                            case '偶尔用':
                                                colorClass = 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
                                                titleColorClass = 'font-semibold text-purple-600 dark:text-purple-400';
                                                break;
                                        }

                                        return (
                                            <div key={category}>
                                                <h4 className={`font-medium mb-2 ${titleColorClass}`}>{category}:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {categorySkills.map((skill, index) => (
                                                        <span
                                                            key={index}
                                                            className={`px-3 py-1 rounded-full text-sm ${colorClass}`}
                                                        >
                                                            {skill.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 设置页面元数据
export const metadata: Metadata = {
    title: '关于我 | 王郁的小站',
    description: 'JavaScript和Java生态的全栈程序员，可独立完成从Linux服务器、数据库、容器、后端服务、全平台前端页面的开发',
};

