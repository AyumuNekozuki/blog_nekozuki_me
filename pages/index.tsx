import Link from 'next/link';
import { client } from '../libs/client';
import Userbox from '../components/Userbox';
import RecentArticles from '../components/RecentArticles';
import Date from '../components/Date';
import Adsense from '../components/Adsense';
import Tag_replace from '../components/Tag_replace';
import Seo from '../components/Seo';

export default function Home({ blog, recentdata }: any) {
	return (
		<>
			<Seo />
			<div className='flex flex-wrap max-w-screen-xl mx-auto'>
				<main className='w-full p-2 lg:w-2/3'>
					{blog.map((ar: any, index: any) => (
						<Link key={index} href={`/${ar.id}`} data-id={ar.id}>
							<a>
								<article className='flex flex-col mb-3 transition-all bg-white sm:flex-row rounded-xl shadow-card text-nicoblack hover:text-themepurple hover:bg-themepurple_bg'>
									<img
										className='object-cover w-full sm:w-1/3 shrink-0 aspect-video rounded-t-xl sm:rounded-r-none sm:rounded-l-xl'
										src={ar.thumbnail ? ar.thumbnail.url + '?fm=webp&w960&h540' : '/ogp.png'}
										width='960'
										height='540'
										alt={ar.title}
									/>
									<div className='p-3'>
										<p className='text-2xs sm:text-sm'>
											<Date dateString={ar.publishedAt} />
										</p>
										<h5 className='my-1 text-sm font-medium tracking-tight text-justify break-all sm:mb-3 sm:text-lg text-inherit line-clamp-1 sm:line-clamp-2'>{ar.title}</h5>
										<p className='text-2xs sm:text-xs line-clamp-1 sm:line-clamp-2 opacity-80'>
											<Tag_replace fieldtext={ar.body[0].editor} />
										</p>
									</div>
								</article>
							</a>
						</Link>
					))}
					{blog.length !== 0 && (
						<Link href='/archive'>
							<a className='block p-3 text-center transition-all bg-white rounded-xl shadow-card text-nicoblack hover:text-themepurple hover:bg-themepurple_bg'>もっと見る</a>
						</Link>
					)}

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
				limit: 10,
				orders: '-publishedAt',
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
