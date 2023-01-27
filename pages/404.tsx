import Link from 'next/link';
import Userbox from '../components/Userbox';
import Adsense from '../components/Adsense';
import Seo from '../components/Seo';

export default function Custom404() {
	return (
		<>
			<Seo pageTitle={'404 Page Not Found'} />
			<div className='flex flex-wrap max-w-screen-xl mx-auto'>
				<main className='w-full p-2 lg:w-2/3'>
					<h2 className='mb-3 text-2xl font-medium'>ページが見つかりませんでした</h2>

					<Link href='/'>
						<a className='block p-3 text-center transition-all bg-white rounded-xl shadow-card text-nicoblack hover:text-themepurple hover:bg-themepurple_bg'>ブログTOPにもどる</a>
					</Link>
				</main>
				<aside className='flex flex-col items-center w-full p-2 lg:w-1/3'>
					<Userbox />
					<Adsense />
				</aside>
			</div>
		</>
	);
}
