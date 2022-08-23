import Link from "next/link";
import { client } from "../../libs/client";
import Userbox from '../../components/Userbox';
import RecentArticles from '../../components/RecentArticles';
import Adsense from '../../components/Adsense';
import Seo from '../../components/Seo';

export default function Home({ tag, recentdata }: any) {

  return (
    <>
      <Seo pageTitle={'タグ一覧'} pagePath={'/tag'} />
      <div className='flex flex-wrap max-w-screen-xl mx-auto'>
        <main className='w-full lg:w-2/3 p-2'>
          <div className="bg-white rounded-xl shadow-card p-5">
            <h2 className="text-2xl font-medium mb-3">タグ一覧</h2>
            {tag[0] && tag.map((tag: any, index: any) => (
              <Link key={index} href={`/tag/${tag.id}`} data-id={tag.id}>
                <a className="shadow-card text-sm inline-flex items-center leading-sm px-3 py-1 transition-all hover:bg-themepurple_bg hover:text-themepurple rounded-full mr-3 mb-3">
                  {tag.tag}
                </a>
              </Link>
            ))}
          </div>

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
      endpoint: "tag",
      queries: {
        limit: 500,
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
      tag: data.contents,
      recentdata: recentdata.contents,
    },
    revalidate: 10
  };
};