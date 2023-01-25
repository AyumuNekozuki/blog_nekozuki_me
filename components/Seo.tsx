import { VFC } from 'react';
import Head from 'next/head';

interface MetaData {
	pageTitle?: string;
	pageDescription?: string;
	pagePath?: string;
	pageImg?: string;
	pageImgWidth?: number;
	pageImgHeight?: number;
	pageType?: string;
}

const defaultContents = {
	siteName: 'ねころぐ',
	defaultTitle: 'ねころぐ',
	defaultDescription: 'ねこづきあゆむの個人ブログです。',
	defaultPath: 'https://blog.nekozuki.me',
};

const Seo: VFC<MetaData> = ({ pageTitle, pageDescription, pagePath, pageImg, pageImgWidth, pageImgHeight, pageType }) => {
	const title = pageTitle ? `${pageTitle} | ${defaultContents.siteName}` : defaultContents.defaultTitle;
	const description = pageDescription ? `${pageDescription?.substring(0, 20)}…` : defaultContents.defaultDescription;
	const url = pagePath ? `${defaultContents.defaultPath}${pagePath}` : defaultContents.defaultPath;
	const imgUrl = pageImg ? pageImg : 'https://blog.nekozuki.me/ogp.png';
	const imgWidth = pageImgWidth ? pageImgWidth : 1280;
	const imgHeight = pageImgHeight ? pageImgHeight : 640;
	const type = pageType ? pageType : 'blog';

	return (
		<Head>
			<title>{title}</title>
			<meta name='viewport' content='width=device-width,initial-scale=1.0' />
			<meta name='description' content={description} />
			<meta property='og:url' content={url} />
			<meta property='og:title' content={title} />
			<meta property='og:site_name' content={defaultContents.siteName} />
			<meta property='og:description' content={description} />
			<meta property='og:type' content={type} />
			<meta property='og:image' content={imgUrl} />
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:site' content='@nekozuki_2525' />
			<meta name='twitter:creator' content='@nekozuki_2525' />

			<link rel='canonical' href={url} />
		</Head>
	);
};

export default Seo;
