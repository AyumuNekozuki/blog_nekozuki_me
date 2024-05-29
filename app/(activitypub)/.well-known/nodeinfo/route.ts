import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  const responseData = NextResponse.json(
    {
      links: [
        {
          rel: 'http://nodeinfo.diaspora.software/ns/schema/2.1',
          href: `https://${process.env.ACTIVITYPUB_HOST}/nodeinfo/2.1`,
        },
        {
          rel: 'http://nodeinfo.diaspora.software/ns/schema/2.0',
          href: `https://${process.env.ACTIVITYPUB_HOST}/nodeinfo/2.0`,
        }
      ],
    },
    {
      headers: {
        'Content-Type': 'application/jrd+json',
        'Cache-Control': 'max-age=0, s-maxage=3600',
      },
    }
  );
  return responseData;
};
