import { forwardRef } from 'react';
import Link from 'next/link';

const Footer = forwardRef<HTMLDivElement>((props, ref) => {

  const link = [
    {
      href: '/policy',
      title: 'policy',
      target: ''
    },
    {
      href: 'https://prof.nekozuki.me',
      title: 'contact',
      target: '_blank'
    },
  ]

  return (
    <footer ref={ref} className='p-4 bg-theme_light-text-current text-theme_light-bg-current'>
      <div className='flex justify-between max-w-5xl px-4 py-4 mx-auto'>
        <Link href="/" className='transition-all hover:opacity-70'>ねこづきあゆむのブログ</Link>
        <div className='flex gap-4'>
          {
            link.map((item, index) => {
              return (
                <Link className='tracking-wider transition-all hover:opacity-70' key={index} href={item.href} target={item.target}>{item.title}</Link>
              )
            })
          }
        </div>
      </div>
      <small className='block mx-auto my-4 tracking-wider text-center '>&copy; 2018-2023 AyumuNekozuki</small>
    </footer>
  )
});

export default Footer;