import { GetServerSidePropsContext } from 'next';
import RSS from 'rss';
import client from '@/libs/client';

async function generateFeedXml() {
  const feed = new RSS({
    title: "ねこづきあゆむのブログ",
    description: "このブログでは、適当に日々の思いつきを書き連ねています。",
    site_url: "https://blog.nekozuki.me",
    feed_url: "https://blog.nekozuki.me/feed",
    language: 'ja',
  });

  // 例としてpostsを含めるイメージ
  // このあたりの書き方はライブラリのドキュメントを参考にしてください
  const articleData = await client.get({
    endpoint: 'article',
    queries: {
      limit: 10,
      orders: '-publishedAt',
    },
  });

  articleData.contents?.forEach((content: any) => {
    feed.item({
      title: content.title,
      description: content.description,
      date: new Date(content.createdAt),
      url: `https://blog.nekozuki.me/${content.id}`,
    });
  })
  
  // XML形式の文字列にする
  return feed.xml();
}

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const xml = await generateFeedXml(); 

  res.statusCode = 200;
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); 
  res.setHeader('Content-Type', 'text/xml');
  res.end(xml);

  return {
    props: {},
  };
};

const Page = () => null;
export default Page;