import '@/styles/globals.scss';

import { useEffect, useRef, useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { Zen_Maru_Gothic } from 'next/font/google';

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import * as gtag from '@/libs/gtag';
import NextProgress from 'next-progress';
import { AnimatePresence } from 'framer-motion';
import { useTransitionFix } from '@/hooks/useTransitionFix';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const zen_maru_gothic = Zen_Maru_Gothic({
  variable: '--font-zmg',
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
  subsets: ['latin'],
});

export default function App({ Component, pageProps, router }: AppProps) {
  const transitionCallback = useTransitionFix();
  const Router = useRouter();
  const FooterRef = useRef<HTMLDivElement>(null);
  const [bodyMinHeight, setBodyMinHeight] = useState(0);

  // Google Analytics
  useEffect(() => {
    const handleRouterChange = (url: any) => {
      gtag.pageview(url);
    };
    Router.events.on('routeChangeComplete', handleRouterChange);
    return () => {
      Router.events.off('routeChangeComplete', handleRouterChange);
    };
  }, [Router.events]);

  useEffect(() => {
    if(!FooterRef.current) return;
    setBodyMinHeight(window.innerHeight - FooterRef.current.clientHeight);
  }, [FooterRef.current]) 

  return (
    <div className={`w-full min-h-screen ${zen_maru_gothic.className} font-zmg`}>
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
      <NextProgress color="#AE9C9A" options={{ showSpinner: false }} />
      <Header />
      <main style={{ minHeight: `${bodyMinHeight}px`}} className="container max-w-4xl px-4 pt-24 pb-8 mx-auto">
        <AnimatePresence mode="wait" onExitComplete={() => {
          transitionCallback();
          window.scrollTo(0, 0);
        }}>
          <Component key={router.asPath}  {...pageProps} />
        </AnimatePresence>
      </main>
      <Footer ref={FooterRef} />
      <Analytics />
      <SpeedInsights/>
    </div>
  );
}
