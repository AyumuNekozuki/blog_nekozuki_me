import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"></link>
        </Head>
        <body className='bg-themepurple_bg'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument