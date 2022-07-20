import 'tailwindcss/tailwind.css';
import '/styles/global.scss';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import '../styles/article.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
