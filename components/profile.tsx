'use client';

import {
  EditProfileRequest,
  EditProfileValidator,
} from '@/libs/validator/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

interface ProfileProps {
  user: {
    id: string;
    email: string;
    username: string;
    avatar: string | null;
  };
}

const Profile = ({ user }: ProfileProps) => {
  const { register, handleSubmit } =
    useForm<EditProfileRequest>({
      mode: 'onChange',
      resolver: zodResolver(EditProfileValidator),
    });
  const onValid = async ({
    username,
    password,
    avatar,
  }: EditProfileRequest) => {};

  return (
    <div className='pt-4 space-y-4 w-full'>
      <Link href='/profile/mytweets'>
        <div className='border-b-[1px] border-indigo-100 pb-4 flex items-center space-x-2 cursor-pointer text-indigo-500 hover:text-indigo-600'>
          <span className='text-base font-medium'>
            내가 쓴 트윗
          </span>
          <div>
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'
              ></path>
            </svg>
          </div>
        </div>
      </Link>
      <form
        className='space-y-6'
        onSubmit={handleSubmit(onValid)}
      >
        <div className='flex items-center justify-between w-full'>
          <label className='w-2/5 text-base font-medium text-indigo-200 block'>
            Email
            <span className='text-xs pl-[1px]'>
              (unchangeable)
            </span>
          </label>
          <input
            disabled={true}
            type='email'
            id='email'
            value={user.email}
            className='bg-transparent text-indigo-500 w-full appearance-none'
          />
        </div>
        <div className='flex items-center justify-between w-full'>
          <label className='w-2/5 text-base font-medium text-indigo-200'>
            Username
          </label>
          <input
            disabled={true}
            type='text'
            id='username'
            {...register('username')}
            className='bg-transparent dark:text-gray-300 text-indigo-500 w-full appearance-none'
          />
        </div>
      </form>
    </div>
  );
};

export default Profile;
