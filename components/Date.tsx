import { parseISO, format } from 'date-fns'
import ja from 'date-fns/locale/ja'


export default function Date({ dateString }: any) {
  return <time dateTime={dateString}>{format(parseISO(dateString), 'yyyy/MM/dd HH:mm', {locale:ja} )}</time>
};