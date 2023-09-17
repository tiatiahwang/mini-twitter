import Image from 'next/image';
import Link from 'next/link';
import { HeroIcon } from '../ui/hero-icon';

const dummyProfiles = [
  {
    name: 'Rouie',
    username: 'rouie',
    image: '/example.jpg',
    verified: true,
  },
  {
    name: 'Rouie1',
    username: 'rouiee',
    image: '/example.jpg',
    verified: true,
  },
  {
    name: 'Rouie2',
    username: 'rouieeee',
    image: '/example.jpg',
    verified: false,
  },
];

const Suggestion = () => {
  return (
    <section className='bg-sidebar-background rounded-2xl'>
      <div className='px-4 py-3'>
        <h2 className='text-xl font-bold'>Who to follow</h2>
      </div>
      {dummyProfiles.map(
        ({ name, username, image, verified }) => (
          <div
            key={username}
            className='hover:bg-sidebar-hover-color'
          >
            <Link
              href={`/${username}`}
              className='flex items-center justify-between px-4 py-3'
            >
              <div className='flex items-center gap-3 rounded-full'>
                <div className='w-12 h-12'>
                  <Image
                    className='w-12 h-12 transition duration-200 hover:brightness-90 rounded-full'
                    width={14}
                    height={14}
                    src={image}
                    alt={name}
                  />
                </div>
                <div className='leading-5'>
                  <div className='flex items-center gap-1'>
                    <p className='custom-underline font-bold'>
                      {name}
                    </p>
                    {verified && (
                      <HeroIcon
                        iconName='CheckBadgeIcon'
                        className='h-4 w-4'
                        solid
                      />
                    )}
                  </div>
                  <p className='text-secondary'>
                    @{username}
                  </p>
                </div>
              </div>
              <button
                className='bg-follow-button-background px-4 py-1 font-bold text-follow-text-color text-sm rounded-full
                                    transition duration-200 hover:brightness-90'
              >
                Follow
              </button>
            </Link>
          </div>
        ),
      )}
      <div className='w-full hover:bg-sidebar-hover-color rounded-b-2xl'>
        <button className='text-accent-blue-secondary px-4 py-3'>
          Show more
        </button>
      </div>
    </section>
  );
};

export default Suggestion;
