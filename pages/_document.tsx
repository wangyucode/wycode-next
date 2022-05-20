
import { Html, Main, Head, NextScript } from 'next/document';

export const SITE_NAME = '王郁的小站'

export default function Document() {

  return (
      <Html lang="zh-CN">
        <Head>
            <title>{SITE_NAME}</title>
            <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
            <meta name="description" content={`欢迎光临${SITE_NAME}`} />
            <meta
                property="og:image"
                content={`https://og-image.vercel.app/${encodeURI(SITE_NAME)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
            />
            <meta name="og:title" content={SITE_NAME} />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <body className='bg-white dark:bg-slate-900 transition-colors duration-700'>
          <Main />
          <NextScript />
        </body>
      </Html>
  )
}