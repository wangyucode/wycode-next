import AdminTile from "../admin-tile";

export const BuildStatus = AdminTile(function () {
    return (
        <div className="flex flex-col gap-2">
            <a href="https://github.com/wangyucode/node-backend/actions/workflows/main.yml">
                <img
                    src="https://github.com/wangyucode/node-backend/actions/workflows/main.yml/badge.svg"
                    alt="node-backend" />
            </a>
            <a href="https://github.com/wangyucode/wycode-next/actions/workflows/main.yml">
                <img src="https://github.com/wangyucode/wycode-next/actions/workflows/main.yml/badge.svg"
                    alt="wycode-next" />
            </a>
            <a href="https://github.com/wangyucode/deno-backend/actions/workflows/main.yml">
                <img src="https://github.com/wangyucode/deno-backend/actions/workflows/main.yml/badge.svg"
                    alt="deno-backend" />
            </a>
        </div>
    )
});