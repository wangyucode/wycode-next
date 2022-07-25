import Image from "next/image";
import { UserAddIcon,MailIcon } from "@heroicons/react/outline";

import wechatQr from "../../public/about/wechat.jpg";

export default function About() {
    return (
        <div className="my-4 p-2 border rounded border-slate-700/30 dark:border-slate-300/30">
            <h2 className="pb-1 mb-1 text-lg font-semibold border-b border-slate-700/30 dark:border-slate-300/30"><UserAddIcon className="inline h-5"/> 联系我</h2>
            <a href="mailto:wangyu@wycode.cn" title="wangyu@wycode.cn"
                       className="font-semibold text-sky-500 hover:text-sky-400"><MailIcon
                        className="w-5 inline mr-1"/>wangyu@wycode.cn</a>
            <div className="w-56 mt-2"><Image  src={wechatQr}/></div>
        </div>
    );
}