import Link from "next/link";
import { client } from "../libs/client";
import Userbox from '../components/Userbox';
import Date from '../components/Date';

export default function Home({ blog }: any) {
  return (
    <div className='flex flex-wrap max-w-screen-lg mx-auto'>
      <main className='w-full lg:w-2/3 p-2'>
        {blog.map((ar: any) => (
          <Link key={blog.id} href={`/${ar.id}`} data-id={ar.id}>
            <a>
              <article className='bg-white rounded-lg shadow-card mb-3 transition-all text-nicoblack hover:text-themepurple'>
                  <img className="rounded-t-lg" src={ar.thumbnail.url} alt={ar.title} />
                  <div className="p-5">
                    <Date dateString={ar.publishedAt} />
                    <h5 className="mb-2 text-2xl tracking-tight text-justify text-inherit font-medium">{ar.title}</h5>
                  </div>
              </article>
            </a>
          </Link>
        ))}

      </main>
      <aside className='w-full lg:w-1/3 p-2'>
        <Userbox />
      </aside>


      <ul>
        {blog.map((blog: any) => (
          <li key={blog.id}>
            <Link href={`/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps = async () => {
  const data = await client.get({ 
    endpoint: "article",
    queries: {
      limit: 10,
      orders: '-revisedAt',
    },
  });

  return {
    props: {
      blog: data.contents,
    },
  };
};