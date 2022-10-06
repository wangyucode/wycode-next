import withTmInitializer from 'next-transpile-modules';
const withTM = withTmInitializer(['echarts','zrender']);

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withTM({
    trailingSlash: true,
    images: {
        domains: ['api.dujin.org']
    },
});

export default nextConfig;