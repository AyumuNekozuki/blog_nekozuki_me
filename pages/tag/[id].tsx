import ArticlesCard from '@/components/ArticlesCard';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import client from '@/libs/microcms/client';

export default function TagArticles({ articles, tag }: any) {
  return (
    <Layout>
      <div className='flex flex-col gap-5'>
        <SEO pageTitle={`タグ「${tag.tag}」記事一覧`} pagePath={`/tag/${tag.id}`} />
        <h2 className='px-2 pt-4 text-lg font-bold text-theme_light-text-current'>{`タグ「${tag.tag}」記事一覧`}</h2>
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
  const data = await client.get({ endpoint: 'tag', queries: { limit: 500 } });
  const paths = data.contents.map((content: any) => `/tag/${content.id}`);
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;

  const [articleData, tagData]: any = await Promise.all([
    client.get({ endpoint: 'article', queries: { limit: 500, orders: '-publishedAt', filters: `tag[contains]${id}` } }),
    client.get({ endpoint: 'tag', contentId: id }),
  ]).catch((error) => {});

  if (!articleData || !tagData) {
    return { notFound: true };
  }

  return {
    props: {
      articles: articleData.contents,
      tag: tagData,
    },
    revalidate: 10,
  };
};
