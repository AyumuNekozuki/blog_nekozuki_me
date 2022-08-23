import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"></link>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7271400990150352" crossOrigin="anonymous"></script>
          <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
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