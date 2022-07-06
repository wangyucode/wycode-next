import Image from "next/image";
import { UserAddIcon,MailIcon } from "@heroicons/react/outline";

import wechatQr from "../../public/about/wechat.jpg";

export default function About() {
    return (
        <div className="my-4">
            <h2 className="text-lg font-semibold"><UserAddIcon className="inline h-5"/> 联系我</h2>
            <a href="mailto:wangyu@wycode.cn" title="wangyu@wycode.cn"
                       className="font-semibold text-sky-500 hover:text-sky-400"><MailIcon
                        className="w-5 inline mr-1"/>wangyu@wycode.cn</a>
            <div className="w-48 mt-2"><Image  src={wechatQr}/></div>
        </div>
    );
}