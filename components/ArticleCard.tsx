import Image from 'next/image';
import { FaCalendarDay, FaExclamationTriangle, FaPen } from 'react-icons/fa';
import { addYears, isBefore, parseISO } from 'date-fns';
import DateTimeObj from '@/components/DateTimeObj';
import LinkButton from '@/components/LinkButton';
// import TableOfContents from '@/components/TableOfContents';
// import renderToc from '@/libs/renderToc';

const ArticleCard = ({ article }: any) => {

  return (
    <article className='mb-4 rounded-md shadow-md bg-theme_light-bg-current text-theme_light-text-current'>
      {article.thumbnail && <Image priority src={article.thumbnail.url} alt='' width={960} height={540} className='object-cover w-full rounded-t-md aspect-video' />}
      <div className='px-4 py-2'>
        <div className='py-4 text-base font-medium tracking-wider text-justify md:text-xl'>{article.title}</div>
        <div className='flex gap-4 mt-2 text-xs tracking-wider md:text-sm text-theme_light-text-sub'>
          <div className='flex items-center gap-1 md:gap-2'>
            <FaCalendarDay className='text-xs' />
            <DateTimeObj dateString={article.publishedAt} />
          </div>
          <div className='flex items-center gap-1 md:gap-2'>
            <FaPen className='text-xs' />
            <DateTimeObj dateString={article.revisedAt} />
          </div>
        </div>
        <div className='flex gap-2 mt-2 text-xs tracking-wider md:text-sm text-theme_light-text-sub'>
          {article.category && <LinkButton icon='category' href={`/category/${article.category.id}`} title={article.category.category_name} />}
          {article.tag &&
            article.tag.map((item: any, index: number) => {
              return <LinkButton key={index} icon='tag' href={`/tag/${item.id}`} title={item.tag} />;
            })}
        </div>
      </div>
      <hr className=' w-[97.5%] block mx-auto border-theme_light-text-sub2 mt-2 my-4' />
      {isBefore(parseISO(article.revisedAt), addYears(new Date(), -1)) && (
        <div className='flex items-center gap-2 p-4 mx-2 mb-4 text-sm rounded-md bg-theme_light-warn-bg text-theme_light-warn-text'>
          <FaExclamationTriangle />
          この記事は最終更新から１年以上経過しています。
        </div>
      )}
      <div
        className='w-full max-w-full px-4 pb-8 font-normal prose prose-sm md:prose-base text-justify prose-theme_light prose-img:rounded-md prose-video:rounded-md prose-img:w-full hover:prose-a:no-underline'
        dangerouslySetInnerHTML={{ __html: article.article_htmldata }}
      />
    </article>
  );
};

export default ArticleCard;
