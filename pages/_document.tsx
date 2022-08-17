
import { Html, Main, Head, NextScript } from 'next/document';
import { SITE_NAME } from '../components/types';

export default function Document() {

  return (
      <Html lang="zh-CN">
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
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