import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    generateBuildId: () => {
        return "wycode_has_super_power";
    },
};

export default nextConfig;
