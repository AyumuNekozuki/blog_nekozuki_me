import { client } from "../../libs/client";
import Link from "next/link";
import Userbox from '../../components/Userbox';
import RecentArticles from '../../components/RecentArticles';
import Date from '../../components/Date';
import { FaCalendarAlt, FaPencilAlt, FaFolderOpen, FaTag } from "react-icons/fa";
import cheerio from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/GitHub-Dark.css';
import { renderToc } from '../../libs/render-toc';
import TableOfContents from '../../components/TableOfContents';

export default function BlogId({ ar, recentdata }: any) {

  const toc = renderToc(ar.article_htmldata);

  return (
    <div className='flex flex-wrap max-w-screen-xl mx-auto'>
      <main className='w-full lg:w-2/3 p-2'>
        <article className="rounded-xl shadow-card mb-3 transition-all text-nicoblack bg-white">
          <img className="aspect-video w-full object-cover rounded-t-xl" src={ar.thumbnail ? ar.thumbnail.url + '?fm=webp&w960&h540' : '/img/ogp.png'} width='960' height="540" alt={ar.title} />
          <div className="p-2 pb-5">
            <h2 className="text-2xl font-medium mt-2 mb-5">{ar.title}</h2>
            <div className="text-sm flex items-center opacity-80 mb-2">
              <div className="text-sm inline-flex items-center leading-sm px-3 py-1 bg-themepurple_bg rounded-full mr-1">
                <FaCalendarAlt className="mr-1" /><Date dateString={ar.publishedAt} />
              </div>
              <div className="text-sm inline-flex items-center leading-sm px-3 py-1 bg-themepurple_bg rounded-full">
                <FaPencilAlt className="mr-1" /><Date dateString={ar.revisedAt} />
              </div>
            </div>
            <div className="text-sm flex items-center">
              <Link href={'/category/' + ar.category.id}>
                <a className="text-sm inline-flex items-center leading-sm px-3 py-1 transition-all bg-themepurple_bg hover:text-themepurple rounded-full mr-1">
                  <FaFolderOpen className="mr-1" />{ar.category.category_name}
                </a>
              </Link>

              {ar.tag && ar.tag.map((tag: any, index: any) => (
                <Link key={index} href={'/tag/' + tag.id}>
                  <a className="text-sm inline-flex items-center leading-sm px-3 py-1 transition-all bg-themepurple_bg hover:text-themepurple rounded-full mr-1">
                    <FaTag className="mr-1" />{tag.tag}
                  </a>
                </Link>
              ))}


            </div>
          </div>
          <div className="pt-2 px-3 pb-3">
            <div className="max-w-full w-full prose" dangerouslySetInnerHTML={{ __html: ar.article_htmldata }}></div>
          </div>
        </article>
      </main>
      <aside className='w-full lg:w-1/3 p-2 sticky top-0 h-full'>
        <Userbox />
        {toc.length !== 0 && <TableOfContents toc={toc} />}
        <RecentArticles recentdata={recentdata} />
      </aside>
    </div>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "article" });

  const paths = data.contents.map((content: any) => `/${content.id}`);
  return {
    paths,
    fallback: 'blocking'
  };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context: any) => {
  const id = context.params.id;

  const [data, recentdata] = await Promise.all([
    client.get({ endpoint: "article", contentId: id }),
    client.get({ endpoint: "article", queries: { limit: 3, orders: '-publishedAt' } }),
  ]);

  let article_htmldata: string = '';
  data.body.forEach((field: any) => {
    const $ = cheerio.load(field.editor);
    $('pre code').each((_, elm) => {
      const result = hljs.highlightAuto($(elm).text());
      $(elm).html(result.value);
      $(elm).addClass('hljs');
    });

    article_htmldata += $.html();
  })

  let returnData = data
  returnData = {
    ...data,
    article_htmldata: article_htmldata
  }

  return {
    props: {
      ar: returnData,
      recentdata: recentdata.contents,
    },
    revalidate: 10
  };
};