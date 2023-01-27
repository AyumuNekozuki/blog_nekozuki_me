import 'tailwindcss/tailwind.css';
import '/styles/global.scss';
import '../styles/article.scss';

import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<Header />
			<div className='py-5 bg-themepurple_bg'>
				<Component {...pageProps} />
			</div>
			<Footer />
		</>
	);
}

export default MyApp;
