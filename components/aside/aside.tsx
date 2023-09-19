import Footer from './footer';
import InputBox from './input-box';
import Suggestion from './suggestion';

const Aside = () => {
  return (
    <section className='sticky top-0 px-6 mt-2 hidden lg:w-[30%] lg:flex flex-col items-stretch h-screen space-y-6'>
      <InputBox />
      <Suggestion />
      <Footer />
    </section>
  );
};

export default Aside;
