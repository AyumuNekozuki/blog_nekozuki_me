import 'tailwindcss/tailwind.css';
import '/styles/global.scss';
import '../styles/article.scss';

import React from 'react';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';

import * as gtag from '../libs/gtag';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	const router = useRouter();

	useEffect(() => {
		const handleRouterChange = (url: any) => {
			gtag.pageview(url);
		};
		router.events.on('routeChangeComplete', handleRouterChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouterChange);
		};
	}, [router.events]);

	return (
		<>
			<Script strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`} />
			<Script
				id='gtag-init'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
 
           gtag('config', '${gtag.GA_MEASUREMENT_ID}');
           `,
				}}
			/>

			<Header />
			<div className='py-5 bg-themepurple_bg'>
				<Component {...pageProps} />
			</div>
			<Footer />
		</>
	);
}

export default MyApp;
