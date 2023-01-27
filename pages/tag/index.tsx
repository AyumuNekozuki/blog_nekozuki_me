import Link from 'next/link';
import { client } from '../../libs/client';
import Userbox from '../../components/Userbox';
import RecentArticles from '../../components/RecentArticles';
import Adsense from '../../components/Adsense';
import Seo from '../../components/Seo';

export default function Home({ tag, recentdata }: any) {
	return (
		<>
			<Seo pageTitle={'タグ一覧'} pagePath={'/tag'} />
			<div className='flex flex-wrap max-w-screen-xl mx-auto'>
				<main className='w-full p-2 lg:w-2/3'>
					<div className='p-5 bg-white rounded-xl shadow-card'>
						<h2 className='mb-3 text-2xl font-medium'>タグ一覧</h2>
						{tag[0] &&
							tag.map((tag: any, index: any) => (
								<Link key={index} href={`/tag/${tag.id}`} data-id={tag.id}>
									<a className='inline-flex items-center px-3 py-1 mb-3 mr-3 text-sm transition-all rounded-full shadow-card leading-sm hover:bg-themepurple_bg hover:text-themepurple'>{tag.tag}</a>
								</Link>
							))}
					</div>
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
			endpoint: 'tag',
			queries: {
				limit: 500,
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
			tag: data.contents,
			recentdata: recentdata.contents,
		},
		revalidate: 10,
	};
};
