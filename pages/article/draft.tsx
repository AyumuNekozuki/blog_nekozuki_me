import { load } from 'cheerio';
import hljs from 'highlight.js';
import client from '@/libs/client';

import Layout from '@/components/Layout';
import 'highlight.js/styles/github-dark.css';
import UserCard from '@/components/UserCard';
import ArticleCard from '@/components/ArticleCard';
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
      <ArticleCard article={data} />
      <UserCard type='autor' />
    </Layout>
  );
};
export default ArticlePage;


export const getServerSideProps = async (context: any) => {
  const query = context.query;

  if (!query.id || !query.draftKey) {
    return { notFound: true };
  }

  const articleData = await client
    .get({
      endpoint: 'article',
      contentId: query.id,
      queries: { draftKey: query.draftKey }
    }).catch((error: any) => {});

  if (!articleData) {
    return { notFound: true };
  }

  let article_htmldata: string = '';
  articleData.body.forEach((field: any) => {
    if(field.fieldId !== 'codeblock-editor'){
      const cheerio = load(field.editor);
      cheerio('pre code').each((_, elm) => {
        const result = hljs.highlightAuto(cheerio(elm).text());
        cheerio(elm).html(result.value);
        cheerio(elm).addClass('hljs');
      });

      article_htmldata += cheerio.html();
    }else{
      const response = "<pre><code class='hljs'>" + hljs.highlightAuto(field.codeblock).value + "</code></pre>";
      article_htmldata += response;
    }
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
  };
};
