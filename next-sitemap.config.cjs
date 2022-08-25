

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://wycode.cn',
    generateRobotsTxt: true, // (optional)
    generateIndexSitemap: false,
    robotsTxtOptions:{
      transformRobotsTxt: async (config, robotsTxt) => {
        console.log('robots->', config, robotsTxt);
        return robotsTxt.replace('Host: https://wycode.cn', '');
      }
    }
    // ...other options
  }