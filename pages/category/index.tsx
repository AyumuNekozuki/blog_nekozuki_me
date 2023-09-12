import LinkButton from '@/components/LinkButton';
import SEO from '@/components/SEO';
import client from '@/libs/client';

export default function CategoryPage({ categories }: any) {

  return (
    <div className='flex flex-col gap-5'>
      <SEO pageTitle={'カテゴリ一覧'} pagePath={'/category'} />
      <h2 className='px-2 pt-4 text-lg font-bold text-theme_light-text-current'>カテゴリ一覧</h2>
      <div className=' flex flex-wrap gap-3'>
        {categories.map((category: any, index: number) => {
          return <LinkButton key={index} href={`/category/${category.id}`} title={category.category_name} />;
        })}
      </div>
    </div>
  )
}


export const getStaticProps = async () => {
  const categoryData = await client.get({
    endpoint: 'category',
    queries: {
      limit: 500,
      orders: '-published_At',
    },
  });

  return {
    props: {
      categories: categoryData.contents,
    },
    revalidate: 10,
  };
};