import Link from 'next/link';
import { client } from "../libs/client";
import { TwitterShareButton, FacebookShareButton, LineShareButton, HatenaShareButton, TwitterIcon, FacebookIcon, LineIcon, HatenaIcon } from "react-share";

export default function Share({ pagePath, pageTitle }: any) {

	return (
		<div className="max-w-screen-xl bg-white rounded-lg shadow-card md:mx-auto mb-3 w-full">
			<div className="flex flex-col items-start p-3">
				<h5 className='text-sm'>SHARE</h5>
				<div className="flex space-x-8 content-center w-full mt-2 lg:mt-0 justify-center	">
					<TwitterShareButton className='hover:opacity-80 transition-all' url={`https://blog.nekozuki.me${pagePath}`} title={pageTitle}>
						<TwitterIcon size={40} round={true} />
					</TwitterShareButton>

					<FacebookShareButton className='hover:opacity-80 transition-all' url={`https://blog.nekozuki.me${pagePath}`} quote={pageTitle}>
						<FacebookIcon size={40} round={true} />
					</FacebookShareButton>

					<LineShareButton className='hover:opacity-80 transition-all' url={`https://blog.nekozuki.me${pagePath}`} title={pageTitle}>
						<LineIcon size={40} round={true} />
					</LineShareButton>

					<HatenaShareButton className='hover:opacity-80 transition-all' url={`https://blog.nekozuki.me${pagePath}`} title={pageTitle}>
						<HatenaIcon size={40} round={true} />
					</HatenaShareButton>
				</div>
			</div>
		</div>
	)
}