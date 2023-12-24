import { SiMisskey, SiMastodon } from 'react-icons/si';
import { FaTwitter } from "react-icons/fa";
import { useRouter } from 'next/router';

interface ShareProps {
  articleId: string;
  articleTitle: string;
}

const Share = ({ articleId, articleTitle }: ShareProps) => {

  const ShareText = `${articleTitle}%0Ahttps://blog.nekozuki.me/${articleId}`;

  const ShareList = [
    {
      href: `https://misskey-hub.net/ja/share/?visibility=public&localOnly=0&text=${ShareText}`,
      icon: <SiMisskey alt="Misskeyでシェア" />,
    },
    {
      href: `https://donshare.net/share.html?text=${ShareText}`,
      icon: <SiMastodon alt="Mastodonでシェア" />,
    },
    {
      href: `https://twitter.com/share?text=${ShareText}`,
      icon: <FaTwitter alt="Twitterでシェア" />,
    },
  ]

  return (
    <div className="mb-4 p-2 rounded-md shadow-md bg-theme_light-bg-current text-theme_light-text-current">
      <div className='px-2 pb-2 text-sm md:text-md'>記事をシェアする</div>
      <div className="flex items-center justify-center pb-2 gap-4">
        {ShareList.map((item, index) => {
          return (
            <a 
            target='_blank'
            rel='noopener noreferrer'
            className=' flex gap-1 items-center px-3 py-3 text-md transition-all border rounded-2xl border-theme_light-current md:text-md text-theme_light-text-current hover:shadow'
            href={item.href}
          >
            {item.icon}
          </a>
          )
        })}
      </div>
    </div>
  )
}

export default Share;
