import { Head, Html, Main, NextScript } from 'next/document'
import { APP_I18N, APP_THEME } from '@/conf'

const Document = () => {
  return (
    <Html lang={APP_I18N.defaultLocale} className={APP_THEME} data-theme={APP_THEME}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
