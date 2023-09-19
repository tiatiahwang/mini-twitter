import { BsSearch } from 'react-icons/bs';
import Footer from './footer';
import InputBox from './input-box';
import Suggestion from './suggestion';

const Aside = () => {
  return (
    <section className='sticky top-0 px-6 mt-2 hidden lg:w-[30%] lg:flex flex-col items-stretch h-screen space-y-6'>
      <div>
        <div className='relative w-full h-full'>
          <input
            id='search'
            type='text'
            placeholder='Search Twitter'
            className='peer w-full h-full rounded-full outline-none bg-search-background pl-14 pr-4
                      transition focus:border-accent-blue-secondary border-2 border-search-background placeholder:text-secondary'
          />
          <p className='peer-focus:visible invisible'>
            Hello
          </p>
          <label
            htmlFor='search'
            className='absolute top-0 left-0 h-full flex items-center justify-center p-4
                      text-secondary peer-focus:text-accent-blue-secondary'
          >
            <BsSearch clasName='w-5 h-5 ' />
          </label>
        </div>
      </div>
      <Suggestion />
      <Footer />
    </section>
  );
};

export default Aside;
