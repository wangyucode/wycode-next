import { Metadata } from 'next';

export default function OniPage() {
    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <div className="card bg-base-100 shadow-xl border border-warning/20">
                <div className="card-body items-center text-center">
                    <div className="flex items-center gap-2 mb-4">
                        <img src="/apps/oni-icon.png" alt="ONI Icon" className="w-10 h-10" />
                        <h2 className="card-title text-2xl text-warning">通知</h2>
                    </div>
                    <p className="text-lg mb-6 leading-relaxed">
                        为降低维护成本，网页版计算器不再更新维护。<br />
                        请使用微信扫描下方小程序码，使用小程序版计算器。
                    </p>

                    <div className="bg-base-200 p-6 rounded-3xl mb-8">
                        <img
                            src="/apps/oni.jpg"
                            alt="缺氧计算器小程序"
                            className="w-64 h-64 rounded-xl shadow-lg mx-auto"
                        />
                        <p className="mt-4 text-sm font-medium text-slate-500">缺氧游戏计算器小程序</p>
                    </div>

                    <div className="divider">赞赏支持</div>

                    <div className="flex flex-col items-center gap-4 p-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                        <p className="text-slate-600 dark:text-slate-400 font-medium">请我喝杯咖啡支持一下</p>
                        <img
                            src="/about/support.png"
                            alt="赞赏码"
                            className="w-48 h-48 border rounded-lg p-1 bg-white"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export const metadata: Metadata = {
    title: '缺氧计算器 | 王郁的小站',
    description: '缺氧计算器小程序版，为降低维护成本，网页版不再更新维护。',
};
