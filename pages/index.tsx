import Link from "next/link";
import Image from 'next/image';
import { client } from "../libs/client";
import Userbox from '../components/Userbox';
import RecentArticles from '../components/RecentArticles';
import Date from '../components/Date';
import Tag_replace from '../components/Tag_replace';

export default function Home({ blog, recentdata }: any) {

  return (
    <div className='flex flex-wrap max-w-screen-xl mx-auto'>
      <main className='w-full lg:w-2/3 p-2'>
        {blog.map((ar: any) => (
          <Link key={blog.id} href={`/${ar.id}`} data-id={ar.id}>
            <a>
              <article className='flex bg-white rounded-xl shadow-card mb-3 transition-all text-nicoblack hover:text-themepurple'>
                  <img className="w-1/3 object-cover rounded-l-xl" src={ar.thumbnail ? ar.thumbnail.url+'?fm=webp&w960&h540': '/img/ogp.png'} width='960' height="540" alt={ar.title} />
                  <div className="p-3">
                    <p className="text-sm"><Date dateString={ar.publishedAt} /></p>
                    <h5 className="text-lg tracking-tight text-justify text-inherit font-medium break-all line-clamp-2 h-14 mb-3">{ar.title}</h5>
                    <p className="text-xs line-clamp-2 opacity-80"><Tag_replace fieldtext={ar.body[0].editor} /></p>
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