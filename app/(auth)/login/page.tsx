import Login from '@/components/auth/login';

export default function JoinPage() {
  return (
    <section className='pt-4 px-4'>
      <h1 className='text-2xl md:text-4xl text-indigo-500 dark:text-gray-300 font-bold'>
        Login
      </h1>
      <Login />
    </section>
  );
}
