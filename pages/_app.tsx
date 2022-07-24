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
      <div className='bg-themepurple_bg py-5'>
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  )
}

export default MyApp
