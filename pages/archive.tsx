import Link from 'next/link';
import { client } from '../libs/client';
import Userbox from '../components/Userbox';
import RecentArticles from '../components/RecentArticles';
import DateTimeObj from '../components/DateTimeObj';
import Adsense from '../components/Adsense';
import { FaCalendarAlt, FaPencilAlt } from 'react-icons/fa';
import Seo from '../components/Seo';

export default function Home({ blog, recentdata }: any) {
	return (
		<>
			<Seo pageTitle={'過去記事一覧'} pagePath={'/archive'} />
			<div className='flex flex-wrap max-w-screen-xl mx-auto'>
				<main className='w-full p-2 lg:w-2/3'>
					<h2 className='px-2 mt-2 mb-5 text-2xl font-medium'>過去記事一覧</h2>
					{blog.map((ar: any, index: any) => (
						<Link key={index} href={`/${ar.id}`} data-id={ar.id}>
							<a>
								<article className='flex mb-3 transition-all bg-white rounded-xl shadow-card text-nicoblack hover:text-themepurple hover:bg-themepurple_bg'>
									<img
										className='object-cover w-1/5 shrink-0 aspect-video rounded-l-xl'
										src={ar.thumbnail ? ar.thumbnail.url + '?fm=webp&w960&h540' : '/ogp.png'}
										width='960'
										height='540'
										alt={ar.title}
									/>
									<div className='p-3'>
										<div className='flex items-center mb-2 text-2xs sm:text-sm opacity-80'>
											<div className='inline-flex items-center px-3 py-1 mr-1 rounded-full text-2xs sm:text-sm leading-xs bg-themepurple_bg'>
												<FaCalendarAlt className='mr-1' />
												<DateTimeObj dateString={ar.publishedAt} />
											</div>
											<div className='inline-flex items-center px-3 py-1 rounded-full text-2xs sm:text-sm leading-xs bg-themepurple_bg'>
												<FaPencilAlt className='mr-1' />
												<DateTimeObj dateString={ar.revisedAt} />
											</div>
										</div>
										<h5 className='my-1 text-sm font-medium tracking-tight text-justify break-all sm:text-lg sm:mt-0 sm:mb-3 text-inherit line-clamp-1 sm:line-clamp-2'>
											{ar.title}
										</h5>
									</div>
								</article>
							</a>
						</Link>
					))}
					{blog.length === 0 && (
						<article className='flex mb-3 transition-all bg-white rounded-xl shadow-card text-nicoblack'>
							<div className='p-3'>
								<h5 className='text-lg font-medium tracking-tight text-justify break-all text-inherit line-clamp-1'>データの取得に失敗しました</h5>
							</div>
						</article>
					)}
				</main>
				<aside className='flex flex-col items-center w-full p-2 lg:w-1/3'>
					<Userbox />
					<RecentArticles recentdata={recentdata} />
					<Adsense />
				</aside>
			</div>
		</>
	);
}

export const getStaticProps = async () => {
	const [data, recentdata] = await Promise.all([
		client.get({
			endpoint: 'article',
			queries: {
				limit: 500,
				orders: '-published_At',
			},
		}),
		client.get({
			endpoint: 'article',
			queries: {
				limit: 3,
				orders: '-publishedAt',
			},
		}),
	]);

	return {
		props: {
			blog: data.contents,
			recentdata: recentdata.contents,
		},
		revalidate: 10,
	};
};
