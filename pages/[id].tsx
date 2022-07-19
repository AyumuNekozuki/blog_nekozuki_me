import { client } from "../libs/client";
import Link from "next/link";
import Userbox from '../components/Userbox';
import RecentArticles from '../components/RecentArticles';

export default function BlogId({ blog, recentdata }: any) {
  return (
    <div className='flex flex-wrap max-w-screen-xl mx-auto'>
      <main className='w-full lg:w-2/3 p-2'>
        <h1>{blog.title}</h1>
        <p>{blog.publishedAt}</p>
        <div>
          {blog.body.map((field: any) => (
            <div dangerouslySetInnerHTML={{ __html: field.editor }}></div>
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
    client.get({ endpoint: "article", queries: { limit: 3, orders: '-publishedAt' }}),
  ]);

  return {
    props: {
      blog: data,
      recentdata: recentdata.contents,
    },
    revalidate: 10
  };
};