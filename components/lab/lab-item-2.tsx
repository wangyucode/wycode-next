import Image from "next/image";
import LibLink from "./lab-link";
import BannerMsg from "./banner-msg";

export default function LabItem2({title, detail, img1, img2, link, github, deprecated}: any) {
    return (
        <div className='border rounded p-2 border-slate-700/30 dark:border-slate-300/30 col-span-2'>
            <h2 className="text-lg font-semibold">{title}</h2>
            {deprecated && <BannerMsg msg={deprecated}/>}
            <p className="mb-2">{detail}</p>
            {link && <LibLink href={link}/>}
            {github && <LibLink href={github}/>}
            <div className="flex gap-1">
                <Image src={img1}/>
                {img2 && <Image src={img2}/>}
            </div>
        </div>
    );
}