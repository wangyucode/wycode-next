import { UserPlusIcon, EnvelopeIcon, FolderOpenIcon } from "@heroicons/react/24/outline";
import WechatIcon from "@/components/svg/wechat";

export default function About() {
    return (
        <div className="card bg-base-100 shadow-sm mb-4">
            <div className="card-body">
                <h3 className="card-title flex items-center">
                    <UserPlusIcon className="mr-2 h-5 w-5 text-sky-500" /> 联系我
                </h3>
                <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                        <EnvelopeIcon className="h-5 mr-3 mt-0.5 flex-shrink-0 text-sky-500" />
                        <p>
                            合作邮件：
                            <a
                                href="mailto:wangyu@wycode.cn"
                                title="wangyu@wycode.cn"
                                className="ml-1 font-semibold text-sky-500 hover:text-sky-400 dark:hover:text-sky-300 transition-colors"
                            >
                                wangyu@wycode.cn
                            </a>
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center">
                            <WechatIcon className="w-5 h-5 mr-3 text-green-500" />
                            <p>或添加微信：</p>
                        </div>
                        <img
                            src="/about/wechat.jpg"
                            alt="微信二维码"
                            className="w-full max-w-48 mx-auto p-2 border rounded border-slate-300 dark:border-slate-700"
                        />
                        <a
                            href="/blog"
                            className="btn btn-sm btn-ghost text-sm hover:text-info justify-start"
                        >
                            <FolderOpenIcon className="mr-2 h-5 w-5" />
                            查看更多
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}