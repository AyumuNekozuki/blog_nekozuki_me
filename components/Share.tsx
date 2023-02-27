import Link from 'next/link';
import { client } from '../libs/client';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import APShareButton from './ui/APShareButton';

export default function Share({ pagePath, pageTitle }: any) {
	return (
		<div className='w-full max-w-screen-xl mb-3 bg-white rounded-lg shadow-card md:mx-auto'>
			<div className='flex flex-col items-start p-3'>
				<h5 className='text-sm'>SHARE</h5>
				<div className='flex content-center justify-center w-full gap-8 mt-2 lg:mt-0 '>
					<TwitterShareButton className='transition-all hover:opacity-80' url={`https://blog.nekozuki.me${pagePath}`} title={pageTitle}>
						<TwitterIcon size={40} round={true} />
					</TwitterShareButton>
					<APShareButton className='transition-all hover:opacity-80' url={`https://blog.nekozuki.me${pagePath}`} title={pageTitle} icon='mastodon' />
					<APShareButton className='transition-all hover:opacity-80' url={`https://blog.nekozuki.me${pagePath}`} title={pageTitle} icon='misskey' />
				</div>
			</div>
		</div>
	);
}
