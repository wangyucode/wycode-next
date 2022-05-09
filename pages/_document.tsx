import classNames from 'classnames';
import { Html, Head, Main, NextScript } from 'next/document';

import { ThemeProvider, useTheme } from '../components/nav/theme-context';
import { Theme } from '../components/nav/theme-switch';

export default function Document() {

  // const theme = useTheme();

  return (
    // <ThemeProvider>
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    // </ThemeProvider>
  )
}