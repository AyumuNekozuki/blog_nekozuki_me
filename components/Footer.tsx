import Link from 'next/link';

export default function Footer() {
	return (
		<footer className='p-5 bg-themepurple shadow-card md:px-6 md:py-8'>
			<div className='max-w-screen-lg mx-auto sm:flex sm:items-center sm:justify-between'>
				<Link href='/' className='flex items-center mb-4 cursor-pointer sm:mb-0'>
					<img src='/img/nekolog_dark_logo.png' className='h-8 mr-3' alt='ねころぐ' />
				</Link>
				<ul className='flex flex-wrap items-center mb-6 text-sm text-white text-gray-500 sm:mb-0'>
					<li>
						<Link href='/policy'>
							<a className='mr-4 hover:underline md:mr-6'>About & Policy</a>
						</Link>
					</li>
					<li>
						<a href='https://prof.nekozuki.me' className='hover:underline'>
							Contact
						</a>
					</li>
				</ul>
			</div>
			<span className='block mt-5 text-sm text-white sm:text-center'>© 2018 - 2023 AyumuNekozuki</span>
		</footer>
	);
}
