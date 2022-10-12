import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"></link>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7271400990150352" crossOrigin="anonymous"></script>
          <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
					<link rel="apple-touch-icon" sizes="180x180" href="/favicon_package/apple-touch-icon.png?v=20221012"></link>
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon_package/favicon-32x32.png?v=20221012"></link>
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon_package/favicon-16x16.png?v=20221012"></link>
					<link rel="manifest" href="/favicon_package/site.webmanifest?v=20221012"></link>
					<link rel="mask-icon" href="/favicon_package/safari-pinned-tab.svg?v=20221012" color="#66ad6f"></link>
					<link rel="shortcut icon" href="/favicon_package/favicon.ico?v=20221012"></link>
					<meta name="msapplication-TileColor" content="#66ad6f"></meta>
					<meta name="theme-color" content="#66ad6f"></meta>
        </Head>
        <body className='bg-themepurple'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument