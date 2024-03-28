import dynamic from 'next/dynamic';
import { parseISO, format } from 'date-fns';
import ja from 'date-fns/locale/ja';

export default function DateTimeObj({ dateString }: any) {
	return <time suppressHydrationWarning={true} dateTime={dateString}>{format(parseISO(dateString), 'yyyy/MM/dd HH:mm', { locale: ja })}</time>;
}
