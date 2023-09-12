import styles from './Header.module.scss';

import React, { useState } from 'react';
import Link from 'next/link';
import { HiOutlineMenuAlt3, HiOutlineChevronUp } from 'react-icons/hi';

const Header = () => {
  const [isSPMenuOpen, setSPMenuOpen] = useState(false);

  const MenuList = [
    {
      href: '/archive',
      text: 'archive',
    },
    {
      href: '/category',
      text: 'category',
    },
    {
      href: '/tag',
      text: 'tag',
    },
  ];

  const toggleSPMenu = () => {
    setSPMenuOpen(!isSPMenuOpen);
  }

  return (
    <header className={`${styles.header} flex flex-col text-theme_light-text-current justify-between mx-auto py-4 px-8 md:flex-row md:items-center fixed top-4 left-4 font-medium`} style={{textShadow: "0px 0px 3px #F6F5F1"}}>
      <div className='flex flex-row justify-between'>
        <h1 className='flex'>
          <Link href='/' className='flex items-center transition-all hover:opacity-70'>
            ねこづきあゆむのブログ
          </Link>
        </h1>
        <button className='relative flex items-center justify-center text-2xl w-[25px] aspect-square md:hidden' onClick={toggleSPMenu} style={{filter: 'drop-shadow(0 0 1px #F6F5F1)'}}>
          <HiOutlineMenuAlt3 className={` absolute transition-all ${isSPMenuOpen == true && 'opacity-0'}`} />
          <HiOutlineChevronUp className={` absolute transition-all ${isSPMenuOpen == false && 'opacity-0'}`} />
        </button>
      </div>
      <nav className={`flex overflow-hidden h-0 md:h-full transition-all ${isSPMenuOpen && 'mt-4 mb-2 h-32'} md:m-0`}>
        <ul className={`flex flex-col gap-2 md:gap-5 md:flex-row ${isSPMenuOpen && 'w-full'}`}>
          {MenuList.map((item, index) => {
            return (
              <li key={index} className={`flex justify-center md:items-center flex-col list-none `}>
                <Link
                  className={`flex items-center tracking-wider transition-all hover:opacity-70  ${isSPMenuOpen && 'w-full px-2 py-2 rounded-md hover:opacity-70'} md:p-0`}
                  href={item.href}>
                  {item.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
