import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        {/* ActivityPub */}
        <link rel="me" href="https://mi.mashiro.site/@AyumuNekozuki" />
        <link rel="me" href="https://threads.net/@AyumuNekozuki" />

        <link rel='icon' href='/favicon.png'></link>
        <meta name='theme-color' content='#ae9c9b'></meta>
      </Head>
      <body className='bg-theme_light-bg-sub2'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
