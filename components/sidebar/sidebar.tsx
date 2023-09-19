'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from '@headlessui/react';

import { BiHomeCircle, BiUser } from 'react-icons/bi';
import {
  BsBell,
  BsBookmark,
  BsThreeDots,
  BsTwitter,
} from 'react-icons/bs';
import { HiOutlineHashtag } from 'react-icons/hi';
import { HiEnvelope } from 'react-icons/hi2';

import type { Variants } from 'framer-motion';

import Modal from '@/components/ui/modal';
import useModal from '@/hooks/use-modal';

const NAV_ITEMS = [
  { title: '', icon: BiHomeCircle },
  { title: 'Explore', icon: HiOutlineHashtag },
  { title: 'Notifications', icon: BsBell },
  { title: 'Messages', icon: HiEnvelope },
  { title: 'Bookmarks', icon: BsBookmark },
  { title: 'Profile', icon: BiUser },
];

const variants: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.4 },
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: { duration: 0.2 },
  },
};

const Sidebar = () => {
  const pathname = usePathname();
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <section className='sticky top-0 px-4 w-[10%] lg:w-[20%] flex flex-col items-center lg:items-stretch h-screen'>
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
      {/* mobile bottom */}
      <button>
        <div className='lg:hidden py-4'>
          <div className='rounded-full bg-primary w-10 h-10'></div>
        </div>
      </button>
      {/* large screen bottom */}
      <Modal
        modalClassName='max-w-xs bg-black w-full p-8 rounded-2xl space-y-4'
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <div>LOGO</div>
        <div className='space-y-2'>
          <h3 className='font-semibold text-xl'>
            Log out of Twitter?
          </h3>
          <p className='text-sm text-secondary'>
            You can always log back in at any time. If you
            just want to switch accounts, you can do that by
            adding an existing account.
          </p>
        </div>
        <div className='flex flex-col items-center justify-center space-y-2'>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className='bg-primary text-black w-full rounded-full py-2 text-sm font-bold'
          >
            Log out
          </button>
          <button
            onClick={closeModal}
            className='border border-primary w-full rounded-full py-2 text-sm font-bold'
          >
            Cancle
          </button>
        </div>
      </Modal>
      {/* <button
        className='hidden w-full rounded-full lg:flex items-center justify-between space-x-2 bg-transparent p-4 text-center  
                 hover:bg-sidebar-hover-color transition duration-200'
      >
        <div className='flex items-center space-x-2'>
          <div className='rounded-full bg-primary w-10 h-10'></div>
          <div className='text-left'>
            <div className='font-semibold'>
              TwitterClone
            </div>
            <div className='text-xs'>@cloner</div>
          </div>
        </div>
        <div className='block'>
          <BsThreeDots />
        </div>
      </button> */}
      <Menu className='relative' as='section'>
        {({ open }): JSX.Element => (
          <>
            <Menu.Button className='flex w-full items-center justify-between hover:bg-search-background py-2 px-4 mb-4 rounded-full'>
              <div className='flex items-center space-x-2'>
                <div className='rounded-full bg-primary w-10 h-10'></div>
                <div className='text-left'>
                  <div className='font-semibold'>
                    TwitterClone
                  </div>
                  <div className='text-xs'>@cloner</div>
                </div>
              </div>
              <div className='block'>
                <BsThreeDots />
              </div>
            </Menu.Button>
            <AnimatePresence>
              {open && (
                <Menu.Items
                  className='absolute left-0 right-0 -top-32 w-60 xl:w-full rounded-2xl py-4
                  shadow-[0_0_5px_#f2f2f2]'
                  as={motion.div}
                  {...variants}
                  static
                >
                  <Menu.Item>
                    <button className='flex w-full py-2 px-4 hover:bg-sidebar-hover-color'>
                      Add an existing account
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      className='flex w-full rounded-md rounded-t-none py-2 px-4 hover:bg-sidebar-hover-color'
                      onClick={openModal}
                    >
                      Log out @tiatia
                    </button>
                  </Menu.Item>
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </section>
  );
};

export default Sidebar;
