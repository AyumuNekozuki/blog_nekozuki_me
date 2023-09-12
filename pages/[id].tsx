import { load } from 'cheerio';
import hljs from 'highlight.js';
import client from '@/libs/client';

import 'highlight.js/styles/github-dark.css';
import UserCard from '@/components/UserCard';
import ArticleCard from '@/components/ArticleCard';
import SEO from '@/components/SEO';

const ArticlePage = ({ data }: any) => {

  return (
    <>
      <SEO
        pageTitle={data.title}
        pageDescription={data.article_htmldata.replace(/(<([^>]+)>)/gi, '')}
        pagePath={`/${data.id}`}
        pageImg={data.thumbnail ? data.thumbnail.url : 'https://blog.nekozuki.me/mashiro.png'}
      />
      <ArticleCard article={data} />
      <UserCard type='autor' />
    </>
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

  const articleData = await client
    .get({
      endpoint: 'article',
      contentId: id,
    })
    .catch((error) => {});

  if (!articleData) {
    return { notFound: true };
  }

  let article_htmldata: string = '';
  articleData.body.forEach((field: any) => {
    const cheerio = load(field.editor);
    cheerio('pre code').each((_, elm) => {
      const result = hljs.highlightAuto(cheerio(elm).text());
      cheerio(elm).html(result.value);
      cheerio(elm).addClass('hljs');
    });

    article_htmldata += cheerio.html();
  });

  let returnData = articleData;
  returnData = {
    ...articleData,
    article_htmldata: article_htmldata,
  };

  return {
    props: {
      data: returnData,
    },
    revalidate: 10,
  };
};
