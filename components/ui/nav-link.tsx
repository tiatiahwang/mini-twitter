import Link from 'next/link';
import { HeroIcon } from '@/components/ui/hero-icon';
import { IconName } from '@/components/ui/hero-icon';

type NavLinkProps = {
  href: string;
  iconName: IconName;
  linkName: string;
  pathname: string;
};
const NavLink = ({
  href,
  iconName,
  linkName,
  pathname,
}: NavLinkProps) => {
  const isActive = pathname === href;
  return (
    <Link href={href} className='group flex outline-none'>
      <div
        className={`custom-button flex items-center gap-4 self-start pr-5 text-xl transition
                            group-hover:bg-hover-color group-focus-visible:ring-2 group-focus-visible:ring-white
                            group-focus-visible:duration-200 ${
                              isActive && 'font-bold'
                            }`}
      >
        <HeroIcon
          className={`h-7 w-7 ${
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

export default NavLink;
