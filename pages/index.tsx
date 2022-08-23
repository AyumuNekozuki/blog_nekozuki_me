import Link from "next/link";
import { client } from "../libs/client";
import Userbox from '../components/Userbox';
import RecentArticles from '../components/RecentArticles';
import Date from '../components/Date';
import Adsense from '../components/Adsense';
import Tag_replace from '../components/Tag_replace';
import Seo from '../components/Seo';

export default function Home({ blog, recentdata }: any) {

  return (
    <>
      <Seo />
      <div className='flex flex-wrap max-w-screen-xl mx-auto'>
        <main className='w-full lg:w-2/3 p-2'>
          {blog.map((ar: any, index: any) => (
            <Link key={index} href={`/${ar.id}`} data-id={ar.id}>
              <a>
                <article className='flex bg-white rounded-xl shadow-card mb-3 transition-all text-nicoblack hover:text-themepurple hover:bg-themepurple_bg'>
                  <img className="aspect-video w-1/3 object-cover rounded-l-xl" src={ar.thumbnail ? ar.thumbnail.url + '?fm=webp&w960&h540' : '/ogp.png'} width='960' height="540" alt={ar.title} />
                  <div className="p-3">
                    <p className="text-sm"><Date dateString={ar.publishedAt} /></p>
                    <h5 className="text-lg tracking-tight text-justify text-inherit font-medium break-all line-clamp-2 mb-3">{ar.title}</h5>
                    <p className="text-xs line-clamp-2 opacity-80"><Tag_replace fieldtext={ar.body[0].editor} /></p>
                  </div>
                </article>
              </a>
            </Link>
          ))}
          {blog.length !== 0 &&
            <Link href='/archive'>
              <a className='block bg-white rounded-xl text-center shadow-card p-3 transition-all text-nicoblack hover:text-themepurple hover:bg-themepurple_bg'>
                もっと見る
              </a>
            </Link>
          }

          {blog.length === 0 &&
            <article className='flex bg-white rounded-xl shadow-card mb-3 transition-all text-nicoblack'>
              <div className="p-3">
                <h5 className="text-lg tracking-tight text-justify text-inherit font-medium break-all line-clamp-1">データの取得に失敗しました</h5>
              </div>
            </article>
          }
        </main>
        <aside className='w-full lg:w-1/3 p-2 flex flex-col items-center'>
          <Userbox />
          <RecentArticles recentdata={recentdata} />
          <Adsense />
        </aside>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const [data, recentdata] = await Promise.all([
    client.get({
      endpoint: "article",
      queries: {
        limit: 10,
        orders: '-publishedAt',
      },
    }),
    client.get({
      endpoint: "article",
      queries: {
        limit: 3,
        orders: '-publishedAt',
      },
    }),
  ]);

  return {
    props: {
      blog: data.contents,
      recentdata: recentdata.contents,
    },
    revalidate: 10
  };
};