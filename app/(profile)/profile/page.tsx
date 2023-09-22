import Profile from '@/components/profile';
import { getAuthSession } from '@/libs/auth';

export default async function ProfilePage() {
  const session = await getAuthSession();
  return (
    <main className='w-full lg:w-[52%] h-full min-h-screen flex flex-col border-l-[0.5px] border-r-[0.5px]'>
      <h1 className='text-2xl md:text-4xl text-indigo-500 font-bold'>
        Profile
      </h1>
      <div className='pt-4'>
        <Profile user={session?.user!} />
      </div>
    </main>
  );
}
