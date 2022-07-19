import Link from 'next/link';
import { client } from "../libs/client";
import { FaTwitter, FaGlobe, FaMastodon, FaGithub } from 'react-icons/fa';
import { SiNiconico } from 'react-icons/si';
import Date from '../components/Date';

export default function RecentArticles({ recentdata }: any) {

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-card md:mx-auto mb-3">
      <div className="flex flex-col items-start p-3">
        <h5 className='text-sm'>最近の投稿</h5>
        <ul>
          {recentdata.map((ar: any) => (
            <Link key={recentdata.id} href={`/${ar.id}`} data-id={ar.id}>
              <a>
                <li className='flex bg-white mt-3 transition-all text-nicoblack hover:text-themepurple'>
                  <img className="w-1/3 object-cover" src={ar.thumbnail ? ar.thumbnail.url + '?fm=webp&w960&h540' : '/img/ogp.png'} width='960' height="540" alt={ar.title} />
                  <div className='px-2'>
                    <p className="text-xs"><Date dateString={ar.publishedAt} /></p>
                    <h6 className="text-sm tracking-tight text-justify text-inherit font-medium break-all line-clamp-2 mb-3">{ar.title}</h6>
                  </div>
                </li>
              </a>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}