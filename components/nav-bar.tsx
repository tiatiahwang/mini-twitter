import Link from 'next/link';
import { getAuthSession } from '@/libs/auth';
import { Icons } from './icons';

const NavBar = async () => {
  const session = await getAuthSession();
  return (
    <nav className='sticky top-0 min-h-screen flex flex-col items-center border-r-[1px] border-indigo-100 pt-4 space-y-4'>
      {/* Home */}
      <Link href='/'>
        <button className='text-indigo-300 hover:text-indigo-400'>
          <Icons.home className='h-8 w-8' />
        </button>
      </Link>
      {/* Upload */}
      <Link href='/tweets/upload'>
        <button className='text-indigo-300 hover:text-indigo-400'>
          <Icons.upload className='h-9 w-9' />
        </button>
      </Link>
      {/* Profile */}
      <Link href={session?.user ? '/profile' : '/login'}>
        <button className='text-indigo-300 hover:text-indigo-400'>
          <Icons.user className='h-9 w-9' />
        </button>
      </Link>
    </nav>
  );
};

export default NavBar;
