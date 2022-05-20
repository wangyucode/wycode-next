
import { Html, Main, NextScript } from 'next/document';

export default function Document() {

  // const theme = useTheme();

  return (
    // <ThemeProvider>
      <Html lang="zh-CN">
        {/*<Head />*/}
        <body className='bg-white dark:bg-slate-900 transition-colors duration-700'>
          <Main />
          <NextScript />
        </body>
      </Html>
    // </ThemeProvider>
  )
}