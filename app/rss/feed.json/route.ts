import { generatedRssFeed } from '@/libs/rss';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  const data = await generatedRssFeed('json1');

  return new Response(data, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=0, s-maxage=3600',
    },
  });
};
