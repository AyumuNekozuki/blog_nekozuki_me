import Link from 'next/link';

export default function Header() {

	const navMenuToggle = () =>{
		console.log('navMenuToggle');
		const navContents:HTMLElement | null = document.getElementById('nav-content')
		navContents && navContents.classList.toggle("hidden");
	}

  return (
    <header className='flex w-full px-6 bg-themepurple drop-shadow-md'>
      <nav className='top-0 z-10 flex flex-wrap items-center justify-between w-full max-w-screen-lg py-2 mx-auto bg-themepurple'>
        <div className='flex items-center flex-shrink-0 mr-6 text-white'>
          <h1>
            <Link className='text-white no-underline' href='/'>
              <img className='transition-all cursor-pointer max-h-6 hover:opacity-80' src="/img/nekolog_dark_logo.png" alt="ねころぐ" />
            </Link>
          </h1>
        </div>

        <div className='block lg:hidden'>
          <button id='nav-toggle' className='flex items-center px-3 py-2 text-white transition-all border border-white rounded hover:bg-white hover:text-themepurple' onClick={navMenuToggle}>
            <svg className='w-3 h-3 fill-current' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><title>Menu</title><path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' /></svg>
          </button>
        </div>

        <div className='flex-grow hidden w-full pt-3 transition-all lg:flex lg:items-center lg:w-auto lg:pt-0' id='nav-content'>
          <ul className='items-center justify-end flex-1 list-reset lg:flex'>
            <li className='mr-3'>
              <Link href='/archive'><a className='inline-block px-2 py-1 font-medium text-white no-underline transition-all font-mplus hover:opacity-80'>Archive</a></Link>
            </li>
            <li className='mr-3'>
              <Link href='/category'><a className='inline-block px-2 py-1 font-medium text-white no-underline transition-all font-mplus hover:opacity-80'>Category</a></Link>
            </li>
            <li className='mr-3'>
              <Link href='/tag'><a className='inline-block px-2 py-1 font-medium text-white no-underline transition-all font-mplus hover:opacity-80'>Tag</a></Link>
            </li>
            <li className='mr-3'>
              <a className='inline-block px-2 py-1 font-medium text-white no-underline transition-all font-mplus hover:opacity-80' href='https://www.nekozuki.me/about'>About</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}