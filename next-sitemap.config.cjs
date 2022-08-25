/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://wycode.cn',
    generateRobotsTxt: true, // (optional)
    generateIndexSitemap: false
    // ...other options
  }