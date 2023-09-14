import Login from '@/components/auth/login';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <section className='pt-4 px-4'>
      <h1 className='text-2xl md:text-4xl text-indigo-500 dark:text-gray-300 font-bold'>
        Login
      </h1>
      <Login />
      <div className='relative pt-10'>
        <div className='absolute w-full border-t border-indigo-100 dark:border-gray-100' />
        <div className='relative -top-3 text-center'>
          <span className='bg-[#f9f9f9] px-2 text-sm text-indigo-200 dark:text-gray-200 dark:bg-[#1F2937]'>
            If you do not have an account
          </span>
        </div>
      </div>
      <Link
        href='/join'
        className='flex justify-center text-indigo-500 hover:text-indigo-600 hover:underline'
      >
        Join
      </Link>
    </section>
  );
}
