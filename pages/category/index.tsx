import Link from "next/link";
import { client } from "../../libs/client";
import Userbox from '../../components/Userbox';
import RecentArticles from '../../components/RecentArticles';

export default function Home({ category, recentdata }: any) {

  return (
    <div className='flex flex-wrap max-w-screen-xl mx-auto'>
      <main className='w-full lg:w-2/3 p-2'>
        <div className="bg-white rounded-xl shadow-card p-5">
          <h2 className="text-2xl font-medium mb-3">カテゴリ一覧</h2>
          {category.map((category: any, index: any) => (
            <Link key={index} href={`/category/${category.id}`} data-id={category.id}>
              <a className="shadow-card text-sm inline-flex items-center leading-sm px-3 py-1 transition-all hover:bg-themepurple_bg hover:text-themepurple rounded-full mr-3 mb-3">
                {category.category_name}
              </a>
            </Link>
          ))}
        </div>

      </main>
      <aside className='w-full lg:w-1/3 p-2'>
        <Userbox />
        <RecentArticles recentdata={recentdata} />
      </aside>
    </div>
  );
}

export const getStaticProps = async () => {
  const [data, recentdata] = await Promise.all([
    client.get({
      endpoint: "category",
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
      category: data.contents,
      recentdata: recentdata.contents,
    },
    revalidate: 10
  };
};