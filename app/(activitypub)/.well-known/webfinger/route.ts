import { type NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const resourceQuery = searchParams.get('resource');

  if (resourceQuery !== `acct:AyumuNekozuki@${process.env.ACTIVITYPUB_HOST}`) {
    return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
  }

  const responseData = NextResponse.json(
    {
      subject: `acct:AyumuNekozuki@${process.env.ACTIVITYPUB_HOST}`,
      links: [
        {
          rel: 'self',
          type: 'application/activity+json',
          href: `https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki`,
        },
        {
          rel: 'http://webfinger.net/rel/profile-page',
          type: 'text/html',
          href: `https://${process.env.ACTIVITYPUB_HOST}/`,
        },
        // {
        //   rel: 'http://ostatus.org/schema/1.0/subscribe',
        //   template: `https://${process.env.ACTIVITYPUB_HOST}/authorize-follow?acct={uri}`,
        // },
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
