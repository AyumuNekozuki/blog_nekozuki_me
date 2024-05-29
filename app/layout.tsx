import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='ja'>
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