import Link from 'next/link';
import { client } from "../libs/client";
import { FaTwitter, FaGlobe, FaMastodon, FaGithub } from 'react-icons/fa';
import { SiNiconico } from 'react-icons/si';
import Date from '../components/Date';

export default function RecentArticles({ recentdata }: any) {

  return (
    <div className="w-full mb-3 bg-white rounded-lg shadow-card md:mx-auto">
      <div className="flex flex-col items-start p-3">
        <h5 className='text-sm'>最近の投稿</h5>
        <ul>
          {recentdata.map((ar: any, index: any) => (
            <Link key={index} href={`/${ar.id}`} data-id={ar.id}>
              <a>
                <li className='flex my-3 transition-all bg-white text-nicoblack hover:text-themepurple'>
                  <img className="object-cover w-1/3 rounded-lg aspect-video" src={ar.thumbnail ? ar.thumbnail.url + '?fm=webp&w960&h540' : '/ogp.png'} width='960' height="540" alt={ar.title} />
                  <div className='px-2'>
                    <p className="text-xs"><Date dateString={ar.publishedAt} /></p>
                    <h6 className="text-sm font-medium leading-5 tracking-tight text-justify break-all text-inherit line-clamp-2">{ar.title}</h6>
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