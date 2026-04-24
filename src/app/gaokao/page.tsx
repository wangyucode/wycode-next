import { Metadata } from "next";

export default function GaokaoPage() {
    return <iframe className="flex-1 card container shadow mx-auto md:my-4" src="https://wycode.cn/gaokao/" />;
}

export const metadata: Metadata = {
    title: '大模型高考成绩榜 | 王郁的小站',
    description: '大模型高考成绩榜单',
};
