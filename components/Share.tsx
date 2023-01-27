import Link from 'next/link';
import { client } from '../libs/client';
import { TwitterShareButton, FacebookShareButton, LineShareButton, HatenaShareButton, TwitterIcon, FacebookIcon, LineIcon, HatenaIcon } from 'react-share';

export default function Share({ pagePath, pageTitle }: any) {
	return (
		<div className='w-full max-w-screen-xl mb-3 bg-white rounded-lg shadow-card md:mx-auto'>
			<div className='flex flex-col items-start p-3'>
				<h5 className='text-sm'>SHARE</h5>
				<div className='flex content-center justify-center w-full mt-2 space-x-8 lg:mt-0 '>
					<TwitterShareButton className='transition-all hover:opacity-80' url={`https://blog.nekozuki.me${pagePath}`} title={pageTitle}>
						<TwitterIcon size={40} round={true} />
					</TwitterShareButton>

					<FacebookShareButton className='transition-all hover:opacity-80' url={`https://blog.nekozuki.me${pagePath}`} quote={pageTitle}>
						<FacebookIcon size={40} round={true} />
					</FacebookShareButton>

					<LineShareButton className='transition-all hover:opacity-80' url={`https://blog.nekozuki.me${pagePath}`} title={pageTitle}>
						<LineIcon size={40} round={true} />
					</LineShareButton>

					<HatenaShareButton className='transition-all hover:opacity-80' url={`https://blog.nekozuki.me${pagePath}`} title={pageTitle}>
						<HatenaIcon size={40} round={true} />
					</HatenaShareButton>
				</div>
			</div>
		</div>
	);
}
