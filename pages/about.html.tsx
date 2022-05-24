import Image from "next/image";

import Layout from "../components/layout";
import {MailIcon} from "@heroicons/react/outline";
import WechatIcon from "../components/svg/wechat";
import wechatQr from "../public/about/wechat.jpg";
import {useState} from "react";

export default function About() {

    const [hidden, setHidden] = useState(' hidden');

    return (
        <Layout>
            <div className="p-4 max-w-7xl mx-auto flex flex-col items-center">
                <p className="w-full">
                    合作请发送
                    <a href="mailto:wangyu@wycode.cn" title="wangyu@wycode.cn"
                       className="font-semibold mx-1 text-sky-500 hover:text-sky-400"><MailIcon
                        className="w-5 inline mr-1"/>邮件</a>或添加
                    <a href="#" className="font-semibold mx-1 text-green-500 hover:text-green-400"
                       onMouseEnter={() => setHidden('')}
                       onMouseLeave={() => setHidden(' hidden')}>
                        <WechatIcon className="w-5 inline mr-1"/>
                        <div className={`relative inline${hidden}`}><span className="w-32 absolute top-6 -left-6"><Image
                            src={wechatQr}/></span></div>
                        微信
                    </a>
                </p>
            </div>
        </Layout>
    );
}