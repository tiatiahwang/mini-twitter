import Sidebar from '@/components/sidebar/sidebar';

export default function Home() {
  return (
    <div className='w-full h-full flex justify-center items-center relative'>
      <div className='max-w-screen-xl w-full h-full flex relative'>
        <Sidebar />
        <main></main>
        <section></section>
      </div>
    </div>
  );
}
