import client from '@/libs/client';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

const ArticlePage = ({ data }: any) => {
  return (
    <Layout>
      <SEO
        pageTitle={data.title}
        pageDescription={data.article_htmldata.replace(/(<([^>]+)>)/gi, '')}
        pagePath={`/article/${data.id}`}
        pageImg={data.thumbnail ? data.thumbnail.url : 'https://blog.nekozuki.me/mashiro.png'}
      />
    </Layout>
  );
};
export default ArticlePage;

export const getStaticPaths = async () => {
  const data = await client.get({ 
    endpoint: 'article',
    queries: {
      limit: 500,
      orders: '-published_At',
    },
  });

  const paths = data.contents.map((content: any) => `/${content.id}`);
  return {
    paths,
    fallback: 'blocking',
  };
};


export const getStaticProps = async (context: any) => {
  const id = context.params.id;

  return {
    redirect: {
      statusCode: 301,
      destination: `/article/${id}`,
    }
  };
};
