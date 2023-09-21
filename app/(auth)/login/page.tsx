import Join from '@/components/auth/join';
import Login from '@/components/auth/login';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <section className='pt-4 px-20 w-full min-h-screen flex items-center justify-center'>
      <div className='w-1/2'></div>
      <div className='w-1/2 space-y-16'>
        <h1 className='text-2xl lg:text-7xl font-bold'>
          Happening Now
        </h1>
        <div className='w-1/2 space-y-4'>
          <h2 className='text-4xl font-semibold pb-6'>
            Join today.
          </h2>
          <div className='space-y-4'>
            <button className='w-full flex justify-center items-center rounded-full text-black bg-primary py-2 font-semibold'>
              Google
            </button>
            <button className='w-full flex justify-center items-center rounded-full text-black bg-primary py-2 font-semibold'>
              Apple
            </button>
            <div className='relative'>
              <div className='absolute w-full border-t border-secondary' />
              <div className='relative -top-3 text-center'>
                <span className='bg-sidebar-background px-2'>
                  or
                </span>
              </div>
            </div>
            <Join />
          </div>
          <div className='space-y-4 pt-8'>
            <p className='bg-sidebar-background text-lg font-semibold'>
              Already have an account?
            </p>
            {/* TODO: need to seperate login page */}
            <Login />
          </div>
        </div>
      </div>
    </section>
  );
}
