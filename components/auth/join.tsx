'use client';

import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  JoinRequest,
  JoinValidator,
} from '@/libs/validator/auth';
import { Icons } from '../icons';
import useModal from '@/hooks/use-modal';
import Modal from '../ui/modal';
import { IoClose } from 'react-icons/io5';

const Join = () => {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<JoinRequest>({
    mode: 'onChange',
    resolver: zodResolver(JoinValidator),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onValid = async (formData: JoinRequest) => {
    if (errorMessage !== '') setErrorMessage('');
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        '/api/auth/join',
        formData,
      );
      if (data?.success) {
        router.push('/login');
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        if (error?.response?.status === 400) {
          setIsLoading(false);
          setErrorMessage(error.response.data);
        }
      }
      // TODO: status 500 일때 toast
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className='!mt-0 w-full flex justify-center items-center text-primary rounded-full bg-accent-blue py-2 font-semibold'
      >
        Create account
      </button>
      <Modal
        modalClassName='max-w-md bg-black w-full px-2 py-4 rounded-2xl space-y-4'
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <button
          className='p-2 rounded-full hover:bg-sidebar-hover-color'
          onClick={closeModal}
        >
          <IoClose className='w-6 h-6' />
        </button>
        <div className='px-12'>
          <div className='text-2xl lg:text-3xl font-bold'>
            Create your account
          </div>
          <form
            onSubmit={handleSubmit(onValid)}
            className='mt-10'
          >
            <div
              className={`space-y-1 relative ${
                errors?.username ? 'mb-8' : 'mb-10'
              }`}
            >
              <input
                {...register('username', {
                  required: 'required.',
                })}
                id='username'
                type='text'
                className={`peer w-full bg-black border-[0.5px] rounded-sm p-2 outline-none  ${
                  errors?.username
                    ? 'border-error'
                    : 'focus:border-accent-blue border-secondary'
                }`}
                aria-invalid={Boolean(errors.username)}
              />
              <label
                htmlFor='username'
                className={`absolute -top-7 left-0 text-xs ${
                  errors?.username
                    ? 'text-error'
                    : 'peer-focus:text-accent-blue text-secondary'
                }`}
              >
                Username
              </label>
              {errors?.username?.message && (
                <span className='text-error text-xs'>
                  {errors.username.message}
                </span>
              )}
            </div>
            <div
              className={`space-y-1 relative ${
                errors?.email ? 'mb-8' : 'mb-10'
              }`}
            >
              <input
                {...register('email')}
                id='email'
                type='email'
                className={`peer w-full bg-black border-[0.5px] rounded-sm p-2 outline-none  ${
                  errors?.email
                    ? 'border-error'
                    : 'focus:border-accent-blue border-secondary'
                }`}
                aria-invalid={Boolean(errors.email)}
              />
              {errors?.email?.message && (
                <span className='text-error text-xs'>
                  {errors.email.message}
                </span>
              )}
              <label
                htmlFor='email'
                className={`absolute -top-7 left-0 text-xs ${
                  errors?.email
                    ? 'text-error'
                    : 'peer-focus:text-accent-blue text-secondary'
                }`}
              >
                Email
              </label>
            </div>
            <div
              className={`space-y-1 relative ${
                errors?.password ? 'mb-8' : 'mb-10'
              }`}
            >
              <input
                {...register('password')}
                id='password'
                type={showPassword ? 'text' : 'password'}
                className={`peer w-full bg-black border-[0.5px] rounded-sm p-2 outline-none  ${
                  errors?.password
                    ? 'border-error'
                    : 'focus:border-accent-blue border-secondary'
                }`}
                aria-invalid={Boolean(errors.password)}
              />
              <label
                htmlFor='password'
                className={`absolute -top-7 left-0 text-xs ${
                  errors?.password
                    ? 'text-error'
                    : 'peer-focus:text-accent-blue text-secondary'
                }`}
              >
                Password
              </label>
              <div className='absolute right-2 bottom-3'>
                {showPassword ? (
                  <Icons.show
                    className='w-4 h-4 text-secondary cursor-pointer hover:text-accent-blue'
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                  />
                ) : (
                  <Icons.hide
                    className='w-4 h-4 text-secondary cursor-pointer hover:text-accent-blue'
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                  />
                )}
              </div>
              {errors?.password?.message && (
                <span className='text-error text-xs'>
                  {errors.password.message}
                </span>
              )}
            </div>
            {errorMessage && (
              <div className='text-red-500 text-sm flex space-x-1 justify-center items-center font-bold'>
                <Icons.exclamation className='h-4 w-4 text-red-500' />
                <span>{errorMessage}</span>
              </div>
            )}
            <button
              type='submit'
              className='py-2 w-full bg-accent-blue text-white disabled:bg-secondary rounded-full'
              disabled={isLoading || !isValid}
            >
              {isLoading ? 'Loading' : 'Join'}
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Join;
