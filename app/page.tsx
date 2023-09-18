import Sidebar from '@/components/sidebar/sidebar';
import TweetList from '@/components/tweets/tweet-list';

export default function Home() {
  return (
    <div className='w-full h-full flex justify-center items-center relative'>
      <div className='max-w-screen-xl w-full h-full flex relative'>
        <Sidebar />
        <TweetList />
        <section></section>
      </div>
    </div>
  );
}
