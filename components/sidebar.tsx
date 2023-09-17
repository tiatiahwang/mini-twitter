'use client';

import Link from 'next/link';
import { FaTwitter } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

import { IconName } from '@/components/ui/hero-icon';
import NavLink from '@/components/ui/nav-link';

const linkIcons: [string, IconName][] = [
  ['', 'HomeIcon'],
  ['explore', 'HashtagIcon'],
  ['bookmarks', 'BookmarkIcon'],
  ['profile', 'UserIcon'],
];

const navLinks = linkIcons.map(([link, iconName]) => ({
  href: `/${link}`,
  iconName,
  linkName:
    link !== ''
      ? link[0].toUpperCase() + link.slice(1)
      : 'Home',
}));

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className='flex flex-col flex-1 justify-end'>
      <div className='fixed top-0 flex h-full w-72 flex-col justify-between overflow-auto px-4 py-3'>
        <div className='flex flex-col gap-4'>
          <h1 className='flex'>
            <Link
              href='/'
              className='custom-button smooth-tab transition focus-visible:ring-accent-secondary-blue'
            >
              <FaTwitter className='h-7 w-7' />
            </Link>
          </h1>
          <nav className='flex flex-col gap-2'>
            {navLinks.map(({ ...link }) => (
              <NavLink
                key={link.href}
                pathname={pathname}
                {...link}
              />
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
