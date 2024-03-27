import ArticlesCard from '@/components/ArticlesCard';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import client from '@/libs/client';

export default function CategoryArticles({ articles, category }: any) {
  return (
    <Layout>
      <div className='flex flex-col gap-5'>
        <SEO pageTitle={`カテゴリ「${category.category_name}」記事一覧`} pagePath={`/category/${category.id}`} />
        <h2 className='px-2 pt-4 text-lg font-bold text-theme_light-text-current'>{`カテゴリ「${category.category_name}」記事一覧`}</h2>
        {articles.map((article: any, index: number) => {
          return <ArticlesCard key={index} article={article} />;
        })}
        {articles.length === 0 && (
          <div className='flex flex-col items-center mb-4 rounded-md shadow-md bg-theme_light-bg-current text-theme_light-text-current py-32'>
            <div className=' text-center text-md font-medium tracking-wider leading-6'>記事が見つかりませんでした</div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'category', queries: { limit: 500 } });
  const paths = data.contents.map((content: any) => `/category/${content.id}`);
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;

  const [articleData, categoryData]: any = await Promise.all([
    client.get({ endpoint: 'article', queries: { limit: 500, orders: '-publishedAt', filters: `category[equals]${id}` } }),
    client.get({ endpoint: 'category', contentId: id }),
  ]).catch((error) => {});

  if (!articleData || !categoryData) {
    return { notFound: true };
  }

  return {
    props: {
      articles: articleData.contents,
      category: categoryData,
    },
    revalidate: 10,
  };
};
