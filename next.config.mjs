import withTmInitializer from 'next-transpile-modules';
const withTM = withTmInitializer(['echarts', 'zrender']);

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withTM({
    trailingSlash: true,
    images: {
        domains: ['api.dujin.org']
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    }
});

export default nextConfig;