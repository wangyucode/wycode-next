const withTM = require('next-transpile-modules')(['echarts','zrender']);
module.exports = withTM({
    images: {
        domains: ['api.dujin.org']
    },
});