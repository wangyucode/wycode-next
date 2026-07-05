import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://wycode.cn/api/:path*",
            },
        ];
    },
    generateBuildId: () => {
        return "wycode_has_super_power";
    },
};

export default nextConfig;
