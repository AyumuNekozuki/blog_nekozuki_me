import '@/styles/globals.scss';
import React from "react";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Zen_Maru_Gothic } from 'next/font/google';

const zen_maru_gothic = Zen_Maru_Gothic({
  variable: '--font-zmg',
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
  subsets: ['latin'],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='ja' className={`${zen_maru_gothic.className}`}>
      <head>
        <link rel='me' href='https://mi.mashiro.site/@AyumuNekozuki' />
        <link rel='me' href='https://cho.yukiya.me/@AyumuNekozuki' />
        <link rel='me' href='https://threads.net/@AyumuNekozuki' />

        <link rel='icon' href='/favicon.png' />
        <meta name='theme-color' content='#ae9c9b' />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights/>
      </body>
    </html>
  );
};

export default RootLayout;