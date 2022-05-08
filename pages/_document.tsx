import { Html, Head, Main, NextScript } from 'next/document'
import { useReducer } from 'react'
import { Theme } from '../components/theme-switch'

export default function Document() {

    const initialTheme = localStorage.getItem('theme') === Theme.dark ? Theme.dark: Theme.light;
    console.log(initialTheme);
    // const [theme, dispatch] = useReducer(themeReducer, initialTheme)

    return (
      <Html className=''>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }