import Link from 'next/link';
import { HeroIcon } from '@/components/ui/hero-icon';
import { IconName } from '@/components/ui/hero-icon';

type SidebarLinkProps = {
  href: string;
  iconName: IconName;
  linkName: string;
  pathname: string;
};

const SidebarLink = ({
  href,
  iconName,
  linkName,
  pathname,
}: SidebarLinkProps) => {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className='group flex outline-none text-xl py-1'
    >
      <div
        className={`px-3 py-3 rounded-full flex items-center transition duration-200 group-hover:bg-sidebar-hover-color ${
          isActive && 'font-bold'
        }`}
      >
        <HeroIcon
          className={`h-7 w-7 mr-4 ${
            isActive &&
            ['Explore'].includes(linkName) &&
            'stroke-white'
          }`}
          iconName={iconName}
          solid={isActive}
        />
        {linkName}
      </div>
    </Link>
  );
};

export default SidebarLink;
