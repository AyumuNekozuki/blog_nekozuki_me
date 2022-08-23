import Link from "next/link";
import Userbox from '../components/Userbox';
import Adsense from '../components/Adsense';
import Seo from '../components/Seo';

export default function Custom404() {
  return (
    <>
      <Seo pageTitle={'404 Page Not Found'} />
      <div className='flex flex-wrap max-w-screen-xl mx-auto'>
        <main className='w-full lg:w-2/3 p-2'>
          <h2 className="text-2xl font-medium mb-3">ページが見つかりませんでした</h2>

          <Link href='/'>
            <a className='block bg-white rounded-xl text-center shadow-card p-3 transition-all text-nicoblack hover:text-themepurple hover:bg-themepurple_bg'>
              ブログTOPにもどる
            </a>
          </Link>
        </main>
        <aside className='w-full lg:w-1/3 p-2 flex flex-col items-center'>
          <Userbox />
          <Adsense />
        </aside>
      </div>
    </>
  );
}