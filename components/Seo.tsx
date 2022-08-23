import { VFC } from 'react'
import Head from 'next/head'

interface MetaData {
  pageTitle?: string
  pageDescription?: string
  pagePath?: string
  pageImg?: string
  pageImgWidth?: number
  pageImgHeight?: number
  pageType?: string
}

const Seo: VFC<MetaData> = ({
  pageTitle,
  pageDescription,
  pagePath,
  pageImg,
  pageImgWidth,
  pageImgHeight,
  pageType
}) => {
  const defaultTitle = 'ねころぐ'
  const defaultDescription = 'ねこづきあゆむの過去ログ倉庫です。'
  const defaultPath = 'https://blog.nekozuki.me'

  const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle
  const description = pageDescription ? pageDescription : defaultDescription
  const url = pagePath ? `${defaultPath}${pagePath}` : defaultPath
  const imgUrl = pageImg ? pageImg : 'https://blog.nekozuki.me/ogp.png'
  const imgWidth = pageImgWidth ? pageImgWidth : 1280
  const imgHeight = pageImgHeight ? pageImgHeight : 640
  const type = pageType ? pageType : 'blog';

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content='ねころぐ' />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imgUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@nekozuki_2525" />
      <meta name="twitter:creator" content="@nekozuki_2525" />

      <link rel="canonical" href={url} />
    </Head>
  )
}

export default Seo