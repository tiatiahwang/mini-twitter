import Profile from '@/components/profile';
import { getAuthSession } from '@/libs/auth';

export default async function ProfilePage() {
  const session = await getAuthSession();
  return (
    <section className='pt-4 px-4'>
      <h1 className='text-2xl md:text-4xl text-indigo-500 font-bold'>
        Profile
      </h1>
      <div className='pt-4'>
        <Profile user={session?.user!} />
      </div>
    </section>
  );
}
