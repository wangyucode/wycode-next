import fetch from 'node-fetch';

export async function notify() {
    // console.log('bing->', await fetch('http://www.bing.com/webmaster/ping.aspx?siteMap=https://wycode.cn/sitemap.xml'));  4a14cce3e6e84b78994f9488df56e7a0
    console.log('google->', (await fetch('http://www.google.com/webmasters/sitemaps/ping?sitemap=https://wycode.cn/sitemap.xml')).statusText);
}

try {
    notify();
} catch (e) {
    console.error(e);
}
