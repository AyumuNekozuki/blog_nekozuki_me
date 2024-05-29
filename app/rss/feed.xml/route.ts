import { generatedRssFeed } from '@/libs/rss';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  const data = await generatedRssFeed("rss2");

  return new Response(data, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600',
    },
  });
};
