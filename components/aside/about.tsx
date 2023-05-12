import { UserPlusIcon,EnvelopeIcon } from "@heroicons/react/24/outline";
import WechatIcon from "../svg/wechat";

export default function About() {
    return (
        <div className="my-4 p-2 border rounded border-slate-400/30">
            <h2 className="pb-1 mb-1 text-lg font-semibold border-b border-slate-400/30">
                <UserPlusIcon className="inline h-6 mb-0.5"/> 联系我</h2>
            <h3><EnvelopeIcon className="inline h-5 mr-1"/>合作邮件：<a href="mailto:wangyu@wycode.cn" title="wangyu@wycode.cn"
                       className="font-semibold text-sky-500 hover:text-sky-400">wangyu@wycode.cn</a></h3>
            <h3><WechatIcon className="w-5 inline mr-1 text-green-500" />或添加微信：<img src="/about/wechat.jpg" className="w-full mt-2"/></h3>
        </div>
    );
}