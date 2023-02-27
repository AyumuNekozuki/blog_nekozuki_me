import Link from 'next/link';
import { FaTwitter, FaGlobe, FaGithub } from 'react-icons/fa';
import { SiNiconico } from 'react-icons/si';
import MisskeyIcon from './ui/MisskeyIcon';

export default function Userbox() {
	return (
		<div className='w-full mb-3 bg-white rounded-lg shadow-card md:mx-auto'>
			<div className='flex flex-col items-center p-3'>
				<img className='w-24 h-24 mb-3 rounded-full shadow-lg' src='/img/icon_500x500.png' alt='' />
				<h5 className='mb-2 text-xl font-medium text-nicoblack'>ねこづきあゆむ</h5>
				<span className='text-sm text-center text-gray-200'>
					WEBサイトとかを作ってる人。
					<br />
					たまにニコニコに動画を上げてたりします。
				</span>
				<div className='flex mt-4 space-x-2 lg:mt-4'>
					<a
						href='https://prof.nekozuki.me'
						target='_blank'
						rel='noopener noreferrer me'
						className='inline-flex items-center px-3 py-2 font-medium text-center transition-all rounded-lg text-nicoblack hover:bg-themepurple hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-300'>
						<FaGlobe />
					</a>
					<a
						href='https://twitter.com/nekozuki_2525'
						target='_blank'
						rel='noopener noreferrer me'
						className='inline-flex items-center px-3 py-2 font-medium text-center transition-all rounded-lg text-nicoblack hover:bg-themepurple hover:text-white focus:ring-4 focus:outline-none focus:ring-purple -300'>
						<FaTwitter />
					</a>
					<a
						href='https://mi.mashiro.site/@AyumuNekozuki'
						target='_blank'
						rel='noopener noreferrer me'
						className='inline-flex items-center px-3 py-2 font-medium text-center transition-all rounded-lg text-nicoblack hover:bg-themepurple hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-300 hover:fill-white'>
						<MisskeyIcon className='w-4 h-4 font-medium fill-current' />
					</a>
					<a
						href='https://www.nicovideo.jp/user/45048152'
						target='_blank'
						rel='noopener noreferrer me'
						className='inline-flex items-center px-3 py-2 font-medium text-center transition-all rounded-lg text-nicoblack hover:bg-themepurple hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-300'>
						<SiNiconico />
					</a>
					<a
						href='https://github.com/AyumuNekozuki'
						target='_blank'
						rel='noopener noreferrer me'
						className='inline-flex items-center px-3 py-2 font-medium text-center transition-all rounded-lg text-nicoblack hover:bg-themepurple hover:text-white focus:ring-4 focus:outline-none focus:ring-purple -300'>
						<FaGithub />
					</a>
				</div>
			</div>
		</div>
	);
}
