import ArticlesCard from '@/components/ArticlesCard';
import Layout from '@/components/Layout';
import PageLink from '@/components/PageLink';
import SEO from '@/components/SEO';
import client from '@/libs/client';
import { useEffect } from 'react';

const PER_PAGE = 20;

const Archive = ({ articles, page }: { articles: any, page: number}) => {

  return (
    <Layout>
      <div className='flex flex-col gap-5'>
        <SEO pageTitle={'過去記事一覧'} pagePath={`/articles/${page}`} />
        <div className='flex items-center justify-between pt-4'>
          <h2 className='px-2 text-lg font-bold text-theme_light-text-current'>過去記事一覧</h2>
          <div className='flex items-center px-2 text-xs font-medium text-theme_light-text-current'>
            {((page - 1 ) * PER_PAGE) +1} ~ {((page - 1) * PER_PAGE) + articles.length} 件目を表示中
          </div>
        </div>
        {articles.map((article: any, index: number) => {
          return <ArticlesCard key={index} article={article} />;
        })}
        <div className='flex justify-stretch gap-4'>
          <PageLink href={`/articles/${page - 1}`} className={`w-full flex flex-col justify-center py-4 transition-all rounded-md shadow-md md:flex-row bg-theme_light-bg-current text-theme_light-text-current hover:shadow-none items-center ${(page-1 == 0 && "pointer-events-none opacity-40")}`}>
            前のページ
          </PageLink>
          <PageLink href={`/articles/${page + 1}`} className={`w-full flex flex-col justify-center py-4 transition-all rounded-md shadow-md md:flex-row bg-theme_light-bg-current text-theme_light-text-current hover:shadow-none items-center ${(articles.length !== 20 && "pointer-events-none opacity-40")}`}>
            次のページ
          </PageLink>
        </div>
      </div>
    </Layout>
  );
};

export default Archive;

export const getStaticPaths = async () => {
  const repos = await client.get({ 
    endpoint: "article"
  }).catch((error: any) => {});

  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i);
  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/articles/${repo}`);

  return { 
    paths, 
    fallback: 'blocking'
  };
}

export const getStaticProps = async (context: any) => {
  const page = context.params.page ? Number(context.params.page) : 1;
  if(!context.params.page || page < 1 || Number.isNaN(page)) {
    return {
      redirect: {
        statusCode: 302,
        destination: '/articles/1',
      }
    }
  }

  const articleData = await client.get({
    endpoint: 'article',
    queries: {
      limit: PER_PAGE,
      orders: '-published_At',
      offset: (page - 1) * PER_PAGE,
    },
  }).catch((error: any) => {});

  if(articleData.contents.length === 0) {
    return {
      redirect: {
        statusCode: 302,
        destination: '/articles/1',
      }
    }
  }

  return {
    props: {
      articles: articleData.contents,
      page: page,
    },
    revalidate: 10,
  };
};
