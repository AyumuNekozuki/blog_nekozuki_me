import { type NextRequest, NextResponse } from 'next/server';
import { context } from '@/libs/activitypub/context';
import client from '@/libs/client';

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const articleId = params.id;

  const articleData = await client.get({ endpoint: 'article', contentId: articleId }).catch((error) => {});
  if(!articleData) return NextResponse.json({ error: 'Activity not found' }, { status: 404 });

  const content = `<p>ブログを更新しました: ${articleData.title}<br><a href="https://blog.nekozuki.me/${articleId}">https://blog.nekozuki.me/${articleId}</p>`;


  return NextResponse.json({
    '@context': context,
    id: `https://${process.env.ACTIVITYPUB_HOST}/notes/${articleId}/activity`,
    type: 'Create',
    actor: `https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki`,
    published: articleData.published_At,
    object: {
      id: `https://${process.env.ACTIVITYPUB_HOST}/${articleId}`,
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
    },
    to: ['https://www.w3.org/ns/activitystreams#Public'],
    cc: [`https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki/followers`],
  }, {
    headers: {
      'Content-Type': 'application/activity+json',
      'Cache-Control': 'max-age=0, s-maxage=3600',
    },
  })
};
