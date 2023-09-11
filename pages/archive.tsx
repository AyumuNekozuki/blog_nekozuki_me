import ArticlesCard from '@/components/ArticlesCard';
import SEO from '@/components/SEO';
import client from '@/libs/client';

const Archive = ({ articles }: any) => {
  return (
    <div className='flex flex-col gap-5'>
      <SEO pageTitle={'過去記事一覧'} pagePath={'/archive'} />
      <h2 className='px-2 pt-4 text-lg font-bold text-theme_light-text-current'>過去記事一覧</h2>
      {articles.map((article: any, index: number) => {
        return <ArticlesCard key={index} article={article} />;
      })}
    </div>
  );
};

export default Archive;

export const getStaticProps = async () => {
  const articleData = await client.get({
    endpoint: 'article',
    queries: {
      limit: 500,
      orders: '-published_At',
    },
  });

  return {
    props: {
      articles: articleData.contents,
    },
    revalidate: 10,
  };
};
