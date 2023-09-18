'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Image from 'next/image';
import { BiHomeCircle, BiUser } from 'react-icons/bi';
import {
  BsBell,
  BsBookmark,
  BsThreeDots,
  BsTwitter,
} from 'react-icons/bs';
import { HiOutlineHashtag } from 'react-icons/hi';
import { HiEnvelope } from 'react-icons/hi2';

const NAV_ITEMS = [
  { title: '', icon: BiHomeCircle },
  { title: 'Explore', icon: HiOutlineHashtag },
  { title: 'Notifications', icon: BsBell },
  { title: 'Messages', icon: HiEnvelope },
  { title: 'Bookmarks', icon: BsBookmark },
  { title: 'Profile', icon: BiUser },
];

const Sidebar = () => {
  const pathname = usePathname();
  console.log(pathname, '');
  return (
    <section className='fixed border-r px-4 sm:w-[68px] md:w-[88px] lg:w-[275px] flex flex-col items-center lg:items-stretch h-screen'>
      <div className='flex flex-col items-stretch h-full space-y-4 mt-4'>
        <Link
          href='/'
          className='rounded-full p-4 text-2xl w-fit transition duration-200 hover:bg-sidebar-hover-color'
        >
          <BsTwitter />
        </Link>
        {NAV_ITEMS.map((item) => (
          <Link
            className={`text-2xl flex items-center justify-start w-fit space-x-4 
                    transition duration-200 hover:bg-sidebar-hover-color rounded-3xl py-2 px-4 ${
                      pathname ===
                        `/${item.title.toLowerCase()}` &&
                      'font-bold'
                    }`}
            href={
              item.title === ''
                ? '/'
                : `/${item.title.toLowerCase()}`
            }
            key={item.title}
          >
            <div>
              <item.icon />
            </div>
            {item.title !== 'Twitter' && (
              <div className='hidden lg:flex'>
                {item.title === ''
                  ? 'Home'
                  : `${item.title}`}
              </div>
            )}
          </Link>
        ))}
        <div className='lg:hidden'>
          <button
            className='w-fit rounded-full p-4 bg-accent-blue-secondary text-white text-2xl font-bold 
                  hover:bg-opacity-90 transition duration-200'
          >
            <BsTwitter />
          </button>
        </div>
        <button
          className='hidden lg:block w-full rounded-3xl bg-accent-blue-secondary text-white px-6 py-3 text-xl font-bold 
                  hover:bg-opacity-90 transition duration-200'
        >
          Post
        </button>
      </div>
      <button
        className='w-full rounded-full flex items-center justify-between space-x-2 m-4 bg-transparent p-4 text-center  
                 hover:bg-sidebar-hover-color transition duration-200'
      >
        <div className='lg:hidden'>
          <div className='rounded-full bg-primary w-10 h-10'></div>
        </div>
        <div className='hidden lg:flex items-center space-x-2'>
          <div className='rounded-full bg-primary w-10 h-10'></div>
          <div className='text-left'>
            <div className='font-semibold'>
              TwitterClone
            </div>
            <div className='text-xs'>@cloner</div>
          </div>
        </div>
        <div className='hidden lg:block'>
          <BsThreeDots />
        </div>
      </button>
    </section>
  );
};

export default Sidebar;
