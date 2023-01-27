import { useEffect } from 'react';
import { client } from '../libs/client';
import Link from 'next/link';
import Userbox from '../components/Userbox';
import RecentArticles from '../components/RecentArticles';
import Date from '../components/Date';
import { FaCalendarAlt, FaPencilAlt, FaFolderOpen, FaTag } from 'react-icons/fa';
import cheerio from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { renderToc } from '../libs/render-toc';
import TableOfContents from '../components/TableOfContents';
import Seo from '../components/Seo';
import Share from '../components/Share';
import Adsense from '../components/Adsense';

export default function BlogId({ ar, recentdata }: any) {
	const toc = renderToc(ar.article_htmldata);

	const cont = 0;
	useEffect(() => {
		const checkAside = setInterval(() => {
			document.querySelector("aside[data-name='sidebar']")?.removeAttribute('style');
			if (cont) clearInterval(checkAside);
		}, 1000);
	});

	return (
		<>
			<Seo
				pageTitle={ar.title}
				pageDescription={ar.article_htmldata.replace(/(<([^>]+)>)/gi, '')}
				pagePath={`/${ar.id}`}
				pageImg={ar.thumbnail ? ar.thumbnail.url : 'https://blog.nekozuki.me/ogp.png'}
			/>
			<div className='flex flex-wrap max-w-screen-xl mx-auto'>
				<main className='w-full p-2 lg:w-2/3'>
					<article className='mb-3 transition-all bg-white rounded-xl shadow-card text-nicoblack'>
						<img className='object-cover w-full aspect-video rounded-t-xl' src={ar.thumbnail ? ar.thumbnail.url + '?fm=webp&w960&h540' : '/ogp.png'} width='960' height='540' alt={ar.title} />
						<div className='p-2 pb-5'>
							<h2 className='mt-2 mb-5 text-2xl font-medium'>{ar.title}</h2>
							<div className='flex items-center mb-2 text-sm opacity-80'>
								<div className='inline-flex items-center px-3 py-1 mr-1 text-sm rounded-full leading-sm bg-themepurple_bg'>
									<FaCalendarAlt className='mr-1' />
									<Date dateString={ar.publishedAt} />
								</div>
								<div className='inline-flex items-center px-3 py-1 text-sm rounded-full leading-sm bg-themepurple_bg'>
									<FaPencilAlt className='mr-1' />
									<Date dateString={ar.revisedAt} />
								</div>
							</div>
							<div className='flex items-center text-sm'>
								{ar.category && (
									<Link href={'/category/' + ar.category.id}>
										<a className='inline-flex items-center px-3 py-1 mr-1 text-sm transition-all rounded-full leading-sm bg-themepurple_bg hover:text-themepurple'>
											<FaFolderOpen className='mr-1' />
											{ar.category.category_name}
										</a>
									</Link>
								)}

								{ar.tag &&
									ar.tag.map((tag: any, index: any) => (
										<Link key={index} href={'/tag/' + tag.id}>
											<a className='inline-flex items-center px-3 py-1 mr-1 text-sm transition-all rounded-full leading-sm bg-themepurple_bg hover:text-themepurple'>
												<FaTag className='mr-1' />
												{tag.tag}
											</a>
										</Link>
									))}
							</div>
						</div>
						{toc.length !== 0 && (
							<div className='px-3 pt-2 pb-3'>
								<TableOfContents toc={toc} />
							</div>
						)}
						<div className='px-3 pt-2 pb-3'>
							<div className='w-full max-w-full prose' dangerouslySetInnerHTML={{ __html: ar.article_htmldata }}></div>
						</div>
					</article>
					<Share pagePath={`/${ar.id}`} pageTitle={ar.title} />
				</main>
				<aside data-name='sidebar' className='sticky top-0 flex flex-col items-center w-full !h-full p-2 lg:w-1/3'>
					<Userbox />
					{toc.length !== 0 && <TableOfContents toc={toc} />}
					<Adsense />
					<RecentArticles recentdata={recentdata} />
				</aside>
			</div>
		</>
	);
}

export const getStaticPaths = async () => {
	const data = await client.get({ endpoint: 'article' });

	const paths = data.contents.map((content: any) => `/${content.id}`);
	return {
		paths,
		fallback: 'blocking',
	};
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context: any) => {
	const id = context.params.id;

	const [data, recentdata] = await Promise.all([
		client.get({ endpoint: 'article', contentId: id }).catch((error) => {}),
		client.get({ endpoint: 'article', queries: { limit: 3, orders: '-publishedAt' } }),
	]);

	if (!data) {
		return { notFound: true };
	}

	let article_htmldata: string = '';
	data.body.forEach((field: any) => {
		const $ = cheerio.load(field.editor);
		$('pre code').each((_, elm) => {
			const result = hljs.highlightAuto($(elm).text());
			$(elm).html(result.value);
			$(elm).addClass('hljs');
		});

		article_htmldata += $.html();
	});

	let returnData = data;
	returnData = {
		...data,
		article_htmldata: article_htmldata,
	};

	return {
		props: {
			ar: returnData,
			recentdata: recentdata.contents,
		},
		revalidate: 10,
	};
};
