import LibLink from "./lab-link";
import BannerMsg from "../banner-msg";

export default function LabItem({large, title, detail, img1, img2, link, github, deprecated}: any) {
    const col = large ? ' col-span-2': ''
    return (
        <div className={`border rounded p-2 border-slate-700/30 dark:border-slate-300/30${col}`}>
            <h2 className="text-lg font-semibold">{title}</h2>
            {deprecated && <BannerMsg type="error" msg={deprecated}/>}
            <p className="mb-2">{detail}</p>
            {link && <LibLink href={link}/>}
            {github && <LibLink href={github}/>}
            <div className="flex gap-1 justify-center">
                {img1 && <div className="relative"><img className="" src={img1}/></div>}
                {img2 && <div className="relative"><img className="" src={img2}/></div>}
            </div>
        </div>
    );
}
