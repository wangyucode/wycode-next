import Image from "next/image";

import Layout from "../components/layout";
import { MailIcon, UserAddIcon } from "@heroicons/react/outline";
import WechatIcon from "../components/svg/wechat";
import wechatQr from "../public/about/wechat.jpg";
import { useState } from "react";
import Comments from "../components/comment/comments";

export default function About() {

    const [hidden, setHidden] = useState(' hidden');

    return (
        <Layout>
            <div className="p-4 max-w-7xl mx-auto flex flex-col items-center">
                <div className="my-4">
                    <h2 className="text-lg font-semibold">
                        <MailIcon className="w-6 inline mr-1" />合作请发送邮件：</h2>
                    <a href="mailto:wangyu@wycode.cn" title="wangyu@wycode.cn"
                        className="font-semibold text-sky-500 hover:text-sky-400">wangyu@wycode.cn</a>
                    <h2 className="text-lg font-semibold mt-4">
                        <WechatIcon className="w-5 inline mr-1 text-green-500" />或添加微信：</h2>
                    <div className="w-48 mt-2"><Image src={wechatQr} /></div>
                </div>
                <Comments />
            </div>
        </Layout>
    );
}