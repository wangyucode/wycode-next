import IframeWithProgress from "@/components/iframe-with-progress";

export default function DoggerPage() {
    return (
        <div className="flex-1 flex flex-col container mx-auto md:my-4">
            <IframeWithProgress src="https://wycode.cn/dogger/" />
        </div>
    );
}