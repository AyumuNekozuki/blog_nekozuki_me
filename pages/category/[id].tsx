import { client } from '../../libs/client';
import Link from 'next/link';
import Userbox from '../../components/Userbox';
import RecentArticles from '../../components/RecentArticles';
import Date from '../../components/Date';
import { FaCalendarAlt, FaPencilAlt } from 'react-icons/fa';
import Adsense from '../../components/Adsense';
import Seo from '../../components/Seo';

export default function BlogId({ ar, recentdata, categorydata }: any) {
	return (
		<>
			<Seo pageTitle={`カテゴリ「${categorydata[0].category_name}」記事一覧`} pagePath={`/category/${categorydata[0].id}`} />
			<div className='flex flex-wrap max-w-screen-xl mx-auto'>
				<main className='w-full p-2 lg:w-2/3'>
					<h2 className='px-2 mt-2 mb-5 text-2xl font-medium'>カテゴリ「{categorydata[0].category_name}」記事一覧</h2>
					{ar.map((ar: any, index: any) => (
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
												<Date dateString={ar.publishedAt} />
											</div>
											<div className='inline-flex items-center px-3 py-1 rounded-full text-2xs sm:text-sm leading-xs bg-themepurple_bg'>
												<FaPencilAlt className='mr-1' />
												<Date dateString={ar.revisedAt} />
											</div>
										</div>
										<h5 className='text-sm font-medium tracking-tight text-justify break-all sm:text-lg text-inherit line-clamp-1'>{ar.title}</h5>
									</div>
								</article>
							</a>
						</Link>
					))}
					{ar.length === 0 && (
						<article className='flex mb-3 transition-all bg-white rounded-xl shadow-card text-nicoblack'>
							<div className='p-3'>
								<h5 className='text-lg font-medium tracking-tight text-justify break-all text-inherit line-clamp-1'>記事が見つかりませんでした</h5>
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

export const getStaticPaths = async () => {
	const data = await client.get({ endpoint: 'category', queries: { limit: 500 } });

	const paths = data.contents.map((content: any) => `/category/${content.id}`);
	return {
		paths,
		fallback: 'blocking',
	};
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context: any) => {
	const id = context.params.id;

	const [data, recentdata, categorydata] = await Promise.all([
		client.get({ endpoint: 'article', queries: { limit: 500, orders: '-publishedAt', filters: `category[equals]${id}` } }).catch((error) => {}),
		client.get({ endpoint: 'article', queries: { limit: 3, orders: '-publishedAt' } }),
		client.get({ endpoint: 'category', queries: { limit: 1, filters: `id[equals]${id}` } }).catch((error) => {}),
	]);

	if (!data) {
		return { notFound: true };
	}

	return {
		props: {
			ar: data.contents,
			recentdata: recentdata.contents,
			categorydata: categorydata.contents,
		},
		revalidate: 10,
	};
};
