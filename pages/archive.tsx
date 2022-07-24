import Link from "next/link";
import { client } from "../libs/client";
import Userbox from '../components/Userbox';
import RecentArticles from '../components/RecentArticles';
import Date from '../components/Date';
import { FaCalendarAlt, FaPencilAlt } from "react-icons/fa";

export default function Home({ blog, recentdata }: any) {

  return (
    <div className='flex flex-wrap max-w-screen-xl mx-auto'>
      <main className='w-full lg:w-2/3 p-2'>
        <h2 className="text-2xl font-medium mt-2 mb-5 px-2">過去記事一覧</h2>
        {blog.map((ar: any, index: any) => (
          <Link key={index} href={`/${ar.id}`} data-id={ar.id}>
            <a>
              <article className='flex bg-white rounded-xl shadow-card mb-3 transition-all text-nicoblack hover:text-themepurple'>
                <img className="aspect-video w-1/5 object-cover rounded-l-xl" src={ar.thumbnail ? ar.thumbnail.url + '?fm=webp&w960&h540' : '/img/ogp.png'} width='960' height="540" alt={ar.title} />
                <div className="p-3">
                  <div className="text-xs flex items-center opacity-80 mb-2">
                    <div className="text-xs inline-flex items-center leading-xs px-3 py-1 bg-themepurple_bg rounded-full mr-1">
                      <FaCalendarAlt className="mr-1" /><Date dateString={ar.publishedAt} />
                    </div>
                    <div className="text-xs inline-flex items-center leading-xs px-3 py-1 bg-themepurple_bg rounded-full">
                      <FaPencilAlt className="mr-1" /><Date dateString={ar.revisedAt} />
                    </div>
                  </div>
                  <h5 className="text-lg tracking-tight text-justify text-inherit font-medium break-all line-clamp-1">{ar.title}</h5>
                </div>
              </article>
            </a>
          </Link>
        ))}

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
      endpoint: "article",
      queries: {
        limit: 500,
        orders: '-published_At',
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