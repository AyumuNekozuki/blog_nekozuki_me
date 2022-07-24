import Link from 'next/link';

export default function Footer() {

  return (
    <footer className="p-5 bg-themepurple shadow-card md:px-6 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between max-w-screen-lg mx-auto">
        <a href="https://blog.nekozuki.me/" className="flex items-center mb-4 sm:mb-0">
          <img src="/img/nekolog_dark_logo.png" className="mr-3 h-8" alt="Flowbite Logo" />
        </a>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 text-white">
          <li>
            <Link href="/policy"><a className="mr-4 hover:underline md:mr-6">About & Policy</a></Link>
          </li>
          <li>
            <a href="https://www.nekozuki.me/contact" className="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
      <span className="block text-sm text-white mt-5 sm:text-center">© 2018 - 2022 AyumuNekozuki</span>
    </footer>

  );
}