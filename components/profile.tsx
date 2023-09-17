'use client';

import {
  EditPasswordRequest,
  EditProfileRequest,
  EditProfileValidator,
  EditUsernameRequest,
} from '@/libs/validator/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Icons } from './icons';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

interface ProfileProps {
  user: {
    id: string;
    email: string;
    username: string;
    avatar: string | null;
  };
}

const Profile = ({ user }: ProfileProps) => {
  const {
    register,
    setError,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<EditProfileRequest>({
    mode: 'onChange',
    resolver: zodResolver(EditProfileValidator),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [selectPassword, setSelectPassword] =
    useState(false);

  useEffect(() => {
    if (user?.username)
      setValue('username', user?.username);
  }, [user, setValue]);

  const {
    mutate: changeUsername,
    isLoading: isUsernameLoading,
  } = useMutation({
    mutationFn: async ({
      username,
    }: EditUsernameRequest) => {
      const { data } = await axios.post(
        '/api/profile/edit/username',
        { username },
      );
      return data;
    },
    onError: (error) => {
      //TODO: TOAST
      if (error instanceof AxiosError) {
        setError('username', {
          message: error?.response?.data,
        });
      }
    },
    onSuccess: (data) => {
      if (data?.success) {
        //TODO: TOAST
      }
    },
  });

  const {
    mutate: changePassword,
    isLoading: isPasswordLoading,
  } = useMutation({
    mutationFn: async ({
      password,
      newPassword,
    }: EditPasswordRequest) => {
      const { data } = await axios.post(
        '/api/profile/edit/password',
        { password, newPassword },
      );

      return data;
    },
    onError: (error) => {
      //TODO: TOAST
      if (error instanceof AxiosError) {
        if (error.response?.status === 401)
          setError('password', {
            message: error?.response?.data,
          });
        if (error.response?.status === 400) {
          setError('newPassword', {
            message: error?.response?.data,
          });
        }
      }
    },
    onSuccess: (data) => {
      if (data?.success) {
        setValue('password', '');
        setValue('newPassword', '');
        //TODO: TOAST
      }
    },
  });

  const onChangeUsername = () => {
    const username = getValues('username');
    if (username === user.username || !username) {
      return setError('username', {
        message: 'Type new username.',
      });
    }
    changeUsername({ username });
  };

  const onChangePassword = () => {
    const password = getValues('password');
    const newPassword = getValues('newPassword');

    if (!password) {
      setError('password', {
        message: 'Type current password.',
      });
    }

    if (!newPassword) {
      setError('newPassword', {
        message: 'Type new password.',
      });
    }

    if (password && newPassword) {
      changePassword({ password, newPassword });
    }
  };

  return (
    <div className='pt-4 space-y-4 w-full'>
      <Link href='/profile/mytweets'>
        <div className='border-b-[1px] border-indigo-100 pb-4 flex items-center space-x-2 cursor-pointer text-indigo-500 hover:text-indigo-600'>
          <span className='text-base font-medium'>
            My Tweets
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
      <div className='space-y-4'>
        {/* avatar */}
        <div className='flex flex-col items-center justify-center space-y-2'>
          <div className='w-28 h-28 rounded-full bg-gray-400 cursor-pointer'></div>
          <button className='py-2 px-3 w-fit bg-indigo-400 text-white disabled:bg-gray-200 rounded-md text-sm'>
            Change
          </button>
        </div>
        {/* email */}
        <div className='mb-4 space-y-1'>
          <label
            htmlFor='Email'
            className='text-sm text-gray-700/50'
          >
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
            className='w-full bg-transparent border rounded-lg p-2 outline-none text-gray-800/70'
          />
        </div>
        {/* username */}
        <div className='mb-4 space-y-1'>
          <label
            htmlFor='username'
            className='text-sm text-gray-700/50'
          >
            Username
          </label>
          <div>
            <div className='flex justify-between items-center'>
              <div className='w-[80%]'>
                <input
                  {...register('username', {
                    required: 'required.',
                  })}
                  id='username'
                  type='text'
                  className={`w-full bg-transparent border rounded-lg p-2 outline-none ${
                    errors?.username
                      ? 'border-red-500'
                      : 'focus:border-indigo-500'
                  }`}
                  aria-invalid={Boolean(errors.username)}
                />
              </div>
              <div className='flex justify-end items-center w-fit'>
                <button
                  disabled={isUsernameLoading}
                  onClick={onChangeUsername}
                  className='py-2 px-3 w-full bg-indigo-400 text-white disabled:bg-gray-200 rounded-md text-sm'
                >
                  {isUsernameLoading ? 'Loading' : 'Change'}
                </button>
              </div>
            </div>
            <div>
              {errors?.username?.message && (
                <span className='text-red-500 text-sm'>
                  {errors.username.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className='border-b-[1px] border-indigo-100 pb-4 ' />
        {/* current password */}
        <div className='mb-4 space-y-1'>
          <label
            htmlFor='password'
            className='text-sm text-gray-700/50'
          >
            Current Password
          </label>
          <div className='flex flex-col space-y-1'>
            <div className='w-[80%] relative'>
              <input
                {...register('password')}
                id='password'
                type={showPassword ? 'text' : 'password'}
                className={`w-full bg-transparent outline-none border p-2 rounded-md ${
                  errors?.password
                    ? 'border-red-500'
                    : 'focus:border-indigo-500'
                }`}
                aria-invalid={Boolean(errors.password)}
              />
              {showPassword ? (
                <Icons.show
                  className='absolute right-2 w-4 h-4 text-gray-400 cursor-pointer'
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                />
              ) : (
                <Icons.hide
                  className='absolute right-2 bottom-3 w-4 h-4 text-gray-400 cursor-pointer'
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                />
              )}
            </div>
            {errors?.password?.message && (
              <span className='text-red-500 text-sm'>
                {errors.password.message}
              </span>
            )}
          </div>
        </div>
        {/* new password */}
        <div className='mb-4 space-y-1'>
          <label
            htmlFor='newPassword'
            className='text-sm text-gray-700/50'
          >
            New Password
          </label>
          <div>
            <div className='flex justify-between items-center'>
              <div className='w-[80%] relative'>
                <input
                  {...register('newPassword')}
                  id='newPassword'
                  type={
                    showNewPassword ? 'text' : 'password'
                  }
                  className={`w-full bg-transparent outline-none border p-2 rounded-md ${
                    errors?.newPassword
                      ? 'border-red-500'
                      : 'focus:border-indigo-500'
                  }`}
                  aria-invalid={Boolean(errors.newPassword)}
                />
                {showNewPassword ? (
                  <Icons.show
                    className='absolute right-2 w-4 h-4 text-gray-400 cursor-pointer'
                    onClick={() =>
                      setShowNewPassword((prev) => !prev)
                    }
                  />
                ) : (
                  <Icons.hide
                    className='absolute right-2 bottom-3 w-4 h-4 text-gray-400 cursor-pointer'
                    onClick={() =>
                      setShowNewPassword((prev) => !prev)
                    }
                  />
                )}
              </div>
              <div>
                <div className='flex justify-end items-center w-fit'>
                  <button
                    disabled={isPasswordLoading}
                    onClick={onChangePassword}
                    className='py-2 px-3 w-full bg-indigo-400 text-white disabled:bg-gray-200 rounded-md text-sm'
                  >
                    {isPasswordLoading
                      ? 'Loading'
                      : 'Change'}
                  </button>
                </div>
              </div>
            </div>
            <div>
              {errors?.newPassword?.message && (
                <span className='text-red-500 text-sm'>
                  {errors.newPassword.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
