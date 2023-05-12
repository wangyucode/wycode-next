import BannerMsg from "../banner-msg";
import AppLink from "./app-link";

export default function App({large, title, detail, img1, img2, link, github, deprecated}: any) {
    const col = large ? ' col-span-2': ''
    return (
        <div className={`border rounded p-2 border-slate-400/30${col}`}>
            <h2 className="text-lg font-semibold">{title}</h2>
            {deprecated && <BannerMsg type="error" msg={deprecated}/>}
            <p className="mb-2">{detail}</p>
            {link && <AppLink href={link}/>}
            {github && <AppLink href={github}/>}
            <div className="flex gap-1 justify-center">
                {img1 && <div className="relative"><img className="" src={img1}/></div>}
                {img2 && <div className="relative"><img className="" src={img2}/></div>}
            </div>
        </div>
    );
}
