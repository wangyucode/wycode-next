import { FunctionComponent } from "react";


export default function AdminTile(Content: FunctionComponent) {

    return function({title}: {title: string}){
        return (
            <div className="border rounded p-2 border-slate-700/30 dark:border-slate-300/30">
                <h2 className="font-semibold pb-2 mb-2 border-b border-slate-700/30 dark:border-slate-300/30">{title}</h2>
                <Content />
            </div>
        );
    }
    
    

}