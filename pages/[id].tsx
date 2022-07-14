import { client } from "../libs/client";


export default function BlogId({ blog }: any) {
  return (
    <main>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      <div>
        {blog.body.map((field: any) => (
          <div dangerouslySetInnerHTML={{ __html: field.editor }}></div>
        ))}
      </div>
    </main>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "article" });

  const paths = data.contents.map((content: any) => `/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "article", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};