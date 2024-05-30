import { type NextRequest, NextResponse } from 'next/server';
import { context } from '@/libs/activitypub/context';
import client from '@/libs/client';
import { activityContent } from '@/libs/activitypub/activityContent';

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const pageQuery = searchParams.get('page');

  if (!pageQuery) {
    return await noQuery();
  } else {
    return await withQuery(pageQuery);
  }
};

const noQuery = async () => {
  const allArticles = await client.get({ endpoint: 'article', queries: { limit: 0, orders: '-published_At' } }).catch((error) => {});

  return NextResponse.json(
    {
      '@context': context,
      id: `https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki/outbox`,
      type: 'OrderedCollection',
      totalItems: allArticles?.totalCount | 0,
      first: `https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki/outbox?page=1`,
      last: `https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki/outbox?page=${Math.ceil(allArticles?.totalCount / 20)}`,
    },
    {
      headers: {
        'Content-Type': 'application/activity+json',
        'Cache-Control': 'max-age=0, s-maxage=3600',
      },
    }
  );
};

const withQuery = async (pageQuery: string) => {
  const responseArticles: any[] = [];
  let articles;
  try{
    articles = await client.get({
      endpoint: 'article',
      queries: { limit: 20, orders: '-published_At', offset: (parseInt(pageQuery) - 1) * 20 },
    }).catch((error) => {});
    
    articles?.contents.map((article: any) => {
      const content = activityContent(article.title, article.id);
  
      responseArticles.push({
        id: `https://${process.env.ACTIVITYPUB_HOST}/notes/${article.id}/activity`,
        actor: `https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki`,
        type: 'Create',
        published: article.published_At,
        object: {
          id: `https://${process.env.ACTIVITYPUB_HOST}/notes/${article.id}`,
          type: 'Note',
          attributedTo: `https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki`,
          content: content,
          published: article.published_At,
          to: ['https://www.w3.org/ns/activitystreams#Public'],
          cc: [`https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki/followers`],
          inRepliTo: null,
          attachment: [],
          sensitive: false,
          tag: [],
        },
        to: ['https://www.w3.org/ns/activitystreams#Public'],
        cc: [`https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki/followers`],
      });
    });
  }catch (e) {
    console.error(e);
  }

  return NextResponse.json(
    {
      '@context': context,
      id: `https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki/outbox?page=${pageQuery}`,
      partOf: `https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki/outbox`,
      type: 'OrderedCollectionPage',
      totalItems: articles?.totalCount | 0,
      orderedItems: responseArticles,
      prev: `https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki/outbox?page=${parseInt(pageQuery) - 1}`,
      next: `https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki/outbox?page=${parseInt(pageQuery) + 1}`,
    },
    {
      headers: {
        'Content-Type': 'application/activity+json',
        'Cache-Control': 'max-age=0, s-maxage=3600',
      },
    }
  );
};
