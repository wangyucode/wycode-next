import Image from "next/image";
import LibLink from "./lab-link";
import BannerMsg from "./banner-msg";

export default function LabItem({title, detail, img, link, github, deprecated}: any) {
    return (
        <div className={"border rounded p-2 border-slate-700/30 dark:border-slate-300/30"}>
            <h2 className="text-lg font-semibold">{title}</h2>
            {deprecated && <BannerMsg msg={deprecated}/>}
            <p className="mb-2">{detail}</p>
            {link && <LibLink href={link}/>}
            {github && <LibLink href={github}/>}
            {img && <Image src={img} layout="responsive"/>}
        </div>
    );
}
