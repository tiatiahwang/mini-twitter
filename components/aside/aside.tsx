import Footer from './footer';
import InputBox from './input-box';
import Suggestion from './suggestion';

const Aside = () => {
  return (
    <aside className='flex flex-col gap-4 px-4 py-3'>
      <InputBox />
      <Suggestion />
      <Footer />
    </aside>
  );
};

export default Aside;
