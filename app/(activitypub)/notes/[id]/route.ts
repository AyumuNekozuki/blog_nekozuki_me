import { type NextRequest, NextResponse } from 'next/server';
import { context } from '@/libs/activitypub/context';
import client from '@/libs/microcms/client';
import { activityContent } from '@/libs/activitypub/activityContent';

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const articleId = params.id;
  const articleData = await client.get({ endpoint: 'article', contentId: articleId }).catch((error) => {});
  if(!articleData) return NextResponse.json({ error: 'Activity not found' }, { status: 404 });

  if(request.headers.get('Accept') === 'application/activity+json') {
    const content = activityContent(articleData.title, articleId);

    return NextResponse.json({
      '@context': context,
      id: `https://${process.env.ACTIVITYPUB_HOST}/notes/${articleId}`,
      type: 'Note',
      attributedTo: `https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki`,
      content: content,
      published: articleData.published_At,
      to: ['https://www.w3.org/ns/activitystreams#Public'],
      cc: [`https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki/followers`],
      inRepliTo: null,
      attachment: [],
      sensitive: false,
      tag: [],
    });
  }else{
    const host = request.headers.get('Host') || 'blog.nekozuki.me';
    return NextResponse.redirect(`http://${host}/${articleId}`);
  }
};
