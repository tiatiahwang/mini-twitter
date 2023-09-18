'use client';

import {
  AiOutlineHeart,
  AiOutlineRetweet,
} from 'react-icons/ai';
import { BsChat } from 'react-icons/bs';
import {
  IoShareOutline,
  IoStatsChart,
} from 'react-icons/io5';

const TweetList = () => {
  return (
    <main className='ml-[275px] w-full h-full max-w-[600px] min-h-screen flex flex-col border-l-[0.5px] border-r-[0.5px]'>
      <h1 className='text-xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0'>
        Home
      </h1>
      {/* make post section */}
      <div className='border-t-[0.5px] border-b-[0.5px] py-4 border-secondary relative'>
        <div className='px-4 flex items-stretch space-x-2'>
          {/* avatar */}
          <div className='w-11 h-11 bg-primary rounded-full flex-none'></div>
          <div className='flex flex-col w-full h-full'>
            {/* post input */}
            <input
              type='text'
              className='w-full h-full text-2xl py-2 placeholder:text-secondary bg-sidebar-background'
              placeholder='What is happening?'
            />
            {/* post button */}
            <div className='w-full flex justify-between items-end'>
              <div></div>

              <button
                className='rounded-full bg-accent-blue-secondary px-4 py-2 text-md text-center
                           font-bold hover:bg-opacity-90 transition duration-200'
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* post list */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className='border-b-[0.5px] p-2 flex space-x-4'
        >
          <div className='w-11 h-11 bg-primary rounded-full flex-none'></div>
          <div>
            <div className='text-base'>
              Hello Hello Hello Hello. Hello Hello Hello
              Hello. Hello Hello Hello Hello. Hello Hello
              Hello Hello. Hello Hello Hello Hello. Hello
              Hello Hello Hello. Hello Hello Hello Hello.
              Hello Hello Hello Hello. Hello Hello Hello
              Hello. Hello Hello Hello Hello.
            </div>
            <div className='bg-primary aspect-square w-full h-80 rounded-xl mt-2'></div>
            <div className='flex items-center justify-start space-x-20 mt-2 w-full'>
              <div className='rounded-full hover:bg-sidebar-hover-color transition duration-200 p-3 cursor-pointer'>
                <BsChat />
              </div>
              <div className='rounded-full hover:bg-sidebar-hover-color transition duration-200 p-3 cursor-pointer'>
                <AiOutlineRetweet />
              </div>
              <div className='rounded-full hover:bg-sidebar-hover-color transition duration-200 p-3 cursor-pointer'>
                <AiOutlineHeart />
              </div>
              <div className='rounded-full hover:bg-sidebar-hover-color transition duration-200 p-3 cursor-pointer'>
                <IoStatsChart />
              </div>
              <div className='rounded-full hover:bg-sidebar-hover-color transition duration-200 p-3 cursor-pointer'>
                <IoShareOutline />
              </div>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};

export default TweetList;
