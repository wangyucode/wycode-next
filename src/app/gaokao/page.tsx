import { Metadata } from "next";
import IframeWithProgress from "@/components/iframe-with-progress";

export default function GaokaoPage() {
    return (
        <div className="flex-1 flex flex-col container mx-auto md:my-4">
            <IframeWithProgress src="https://wycode.cn/gaokao/" />
        </div>
    );
}

export const metadata: Metadata = {
    title: '大模型高考成绩榜 | 王郁的小站',
    description: '大模型高考成绩榜单',
};
