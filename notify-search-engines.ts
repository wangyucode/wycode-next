import fetch from 'node-fetch';

export async function notify() {
    console.log('bing->', await fetch('http://www.bing.com/webmaster/ping.aspx?siteMap=https://wycode.cn/sitemap.xml'));
    console.log('google->', await fetch('http://www.google.com/webmasters/sitemaps/ping?sitemap=https://wycode.cn/sitemap.xml'));
}

notify();