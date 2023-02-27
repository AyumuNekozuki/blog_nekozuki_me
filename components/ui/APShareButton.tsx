import MisskeyIcon from './MisskeyIcon';
import { FaMastodon, FaArrowAltCircleRight } from 'react-icons/fa';
import styles from './APShareButton.module.scss';
import { useEffect } from 'react';

export default function APShareButton({ className, url, title, icon }: { className?: string; url: string; title: string; icon?: any }) {
	const _OpenForm = () => {
		const form = document.querySelector(`#APShareButton_form_${icon}`);
		form?.classList.toggle(styles.active);
	};

	const _sendApplication = (e: { preventDefault: () => any }) => {
		const domainElm = document.querySelector(`#APShareButton_form_${icon} input`) as HTMLInputElement;
		const domain = domainElm?.value || null;

		if (domain === null) return;

		const sendurl = `https://${domain}/share?text=${title}%20%0D%0A${url}`;
		window.open(sendurl, '_blank');

		return e.preventDefault();
	};

	return (
		<div className={styles.APShareButton_Wrapper}>
			<button className={`${className} ${styles.APShareButton} ${styles[icon]} react-share__ShareButton`} onClick={_OpenForm}>
				{icon === 'mastodon' && <FaMastodon className={styles.icon} fill='white' />}
				{icon === 'misskey' && <MisskeyIcon width='20' height='20' fill='white' />}
			</button>
			<form method='getf' className={`${styles.inputForm} ${styles[icon]}`} id={`APShareButton_form_${icon}`} onSubmit={_sendApplication}>
				<input type='text' placeholder='domain' />
				<button type='submit'>
					<FaArrowAltCircleRight />
				</button>
			</form>
		</div>
	);
}
