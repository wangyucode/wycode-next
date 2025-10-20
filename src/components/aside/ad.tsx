import { MegaphoneIcon } from "@heroicons/react/24/outline";

export default function Ad() {
    return (
        <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
                <h3 className="card-title flex items-center">
                    <MegaphoneIcon className="mr-2 h-5 w-5" /> 广告位招租
                </h3>
            </div>
        </div>
    )
}