import Image from 'next/image';
import client from '@/libs/client';

import Layout from '@/components/Layout';
import UserCard from '@/components/UserCard';
import ArticlesCard from '@/components/ArticlesCard';
import PageLink from '@/components/PageLink';
import SEO from '@/components/SEO';

const Home = ({ articles }: any) => {
  return (
    <Layout>
      <div className='flex flex-col gap-5'>
        <SEO />
        <UserCard />
        {articles.map((article: any, index: number) => {
          return <ArticlesCard key={index} article={article} />;
        })}
        <PageLink href='/articles' className='flex flex-col justify-center py-4 transition-all rounded-md shadow-md md:flex-row bg-theme_light-bg-current text-theme_light-text-current hover:shadow-none items-center'>
          もっと読む
        </PageLink>
      </div>
    </Layout>
  );
};

export default Home;

export const getStaticProps = async () => {
  const articleData = await client.get({
    endpoint: 'article',
    queries: {
      limit: 10,
      orders: '-publishedAt',
    },
  });

  return {
    props: {
      articles: articleData.contents,
    },
    revalidate: 10,
  };
};
