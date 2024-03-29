import Image from "next/image";
import PageLink from "./PageLink";
import DateTimeObj from "@/components/DateTimeObj";
import TagReplace from "@/components/TagReplace";

const ArticlesCard = ({article}: any) => {

  return (
    <PageLink href={`/article/${article.id}`} className="flex flex-col transition-all rounded-md shadow-md md:flex-row bg-theme_light-bg-current text-theme_light-text-current hover:shadow-none">
      {article.thumbnail && (
        <Image 
          placeholder="blur"
          blurDataURL={`${article.thumbnail.url}?fm=webp&w160&h90&blur=200`} 
          src={`${article.thumbnail.url}?fm=webp&w256&h144`} 
          alt={article.title} width={384} height={216} 
          className="object-cover w-full rounded-t-md md:rounded-r-none md:w-1/3 shrink-0 aspect-video md:rounded-l-md" 
        />
      )}
      <div className="w-full p-4 overflow-hidden">
        <div className="mb-1 font-normal tracking-wider text-ss md:text-xs">
          <DateTimeObj dateString={article.publishedAt} />
        </div>
        <div className=" text-sm font-semibold tracking-wider md:text-base line-clamp-2 ">{article.title}</div>
        <div className="mt-2 text-xs tracking-wider md:text-sm text-theme_light-text-sub line-clamp-2">
          <TagReplace fieldtext={article.body[0].editor} />
        </div>
      </div>
    </PageLink>
  )
}

export default ArticlesCard;