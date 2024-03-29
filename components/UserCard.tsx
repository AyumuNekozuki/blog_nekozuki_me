import Image from 'next/image'
import LinkButton from './LinkButton'

import imgHeader from '@/public/mashiro.png';
import imgIcon from '@/public/icon.png';

type UserCardProps = {
  type?: "autor";
}

const UserCard = (props: UserCardProps) => {

  const Links = [
    {
      href: "https://mi.mashiro.site/@AyumuNekozuki",
      title: "@AyumuNekozuki@mi.mashiro.site",
      icon: "misskey",
    },
    {
      href: "https://github.com/AyumuNekozuki",
      title: "AyumuNekozuki",
      icon: "github",
    },
    {
      href: "https://prof.nekozuki.me",
      title: "Address book",
      icon: "address",
    },
  ]
  
  return (
    <div className="relative rounded-md shadow-md bg-theme_light-bg-current text-theme_light-text-current">
      <Image priority src={imgHeader} alt="" width={864} quality={100} className="object-cover w-full h-32 md:h-64 rounded-t-md" />
      <Image src={imgIcon} alt="" width={144} height={144} quality={100} className="absolute w-16 h-16 rounded-full shadow-md top-24 left-2 md:top-44 md:left-4 md:h-36 md:w-36" />
      <div className="px-4 py-2">
        <div className='pl-16 text-base font-normal md:text-2xl md:pl-40'>
          {props.type === "autor" && <span className='block text-xs md:text-sm text-theme_light-text-sub'>記事を書いた人</span>}
          ねこづきあゆむ
        </div>
        <div className='mt-2 text-xs leading-5 md:leading-6 md:text-sm md:pl-40 text-theme_light-text-current'>
          Webエンジニア。Misskeyサーバー「みすほわいと」の管理人。<br />
          このブログでは、適当に日々の思いつきを書き連ねています。
        </div>
        <div className='my-2 text-xs leading-5 md:leading-6 md:text-sm md:pl-40 text-theme_light-text-current'>
          <div className='my-2 font-semibold'>Links</div>
          <div className='flex flex-wrap gap-2'>
            {
              Links.map((item, index) => {
                return (
                  <LinkButton key={index} href={item.href} title={item.title} target='_blank' rel='me' icon={item.icon} />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard;