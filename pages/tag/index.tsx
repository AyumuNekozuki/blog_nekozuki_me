import LinkButton from '@/components/LinkButton';
import SEO from '@/components/SEO';
import client from '@/libs/client';

export default function TagPage({ tags }: any) {

  return (
    <div className='flex flex-col gap-5'>
      <SEO pageTitle={'タグ一覧'} pagePath={'/category'} />
      <h2 className='px-2 pt-4 text-lg font-bold text-theme_light-text-current'>タグ一覧</h2>
      <div className=' flex flex-wrap gap-3'>
        {tags.map((tag: any, index: number) => {
          return <LinkButton key={index} href={`/tag/${tag.id}`} title={tag.tag} />;
        })}
      </div>
    </div>
  )
}


export const getStaticProps = async () => {
  const tagData = await client.get({
    endpoint: 'tag',
    queries: {
      limit: 500,
      orders: '-published_At',
    },
  });

  return {
    props: {
      tags: tagData.contents,
    },
    revalidate: 10,
  };
};