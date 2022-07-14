import Link from 'next/link';

export default function Header() {

  if(typeof window !== 'undefined'){
    const dom_nav_toggle: HTMLElement | null = document.getElementById('nav-toggle');
    const dom_nav_content: HTMLElement | null = document.getElementById('nav-content');

    if(dom_nav_toggle && dom_nav_content) {
      dom_nav_toggle.onclick = function () {
        dom_nav_content.classList.toggle("hidden");
      }
    }
  }

  return (
    <header className='flex bg-themepurple w-full mb-3 drop-shadow-md px-6'>
      <nav className='flex items-center justify-between flex-wrap bg-themepurple py-2 w-full z-10 top-0 mx-auto max-w-screen-lg'>
        <div className='flex items-center flex-shrink-0 text-white mr-6'>
          <h1>
            <Link className='text-white no-underline hover:opacity-80 transition-all' href='/'>
              <img className='cursor-pointer max-h-6' src="/img/nekolog_dark_logo.png" alt="ねころぐ" />
            </Link>
          </h1>
        </div>

        <div className='block lg:hidden'>
          <button id='nav-toggle' className='flex items-center px-3 py-2 border rounded transition-all text-white border-white hover:bg-white hover:text-themepurple'>
            <svg className='fill-current h-3 w-3' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><title>Menu</title><path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' /></svg>
          </button>
        </div>

        <div className='w-full flex-grow lg:flex lg:items-center lg:w-auto hidden pt-3 lg:pt-0 transition-all' id='nav-content'>
          <ul className='list-reset lg:flex justify-end flex-1 items-center'>
            <li className='mr-3'>
              <Link href='/archive'><a className='font-mplus font-medium inline-block py-1 px-2 transition-all text-white no-underline hover:opacity-80'>Archive</a></Link>
            </li>
            <li className='mr-3'>
              <Link href='/category'><a className='font-mplus font-medium inline-block py-1 px-2 transition-all text-white no-underline hover:opacity-80'>Category</a></Link>
            </li>
            <li className='mr-3'>
              <Link href='/tag'><a className='font-mplus font-medium inline-block py-1 px-2 transition-all text-white no-underline hover:opacity-80'>Tag</a></Link>
            </li>
            <li className='mr-3'>
              <a className='font-mplus font-medium inline-block py-1 px-2 transition-all text-white no-underline hover:opacity-80' href='https://www.nekozuki.me/about'>About</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}