'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  LoginRequest,
  LoginValidator,
} from '@/libs/validator/auth';
import { Icons } from '../icons';
import { signIn } from 'next-auth/react';
import useModal from '@/hooks/use-modal';
import Modal from '../ui/modal';
import { IoClose } from 'react-icons/io5';

const Login = () => {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginRequest>({
    mode: 'onChange',
    resolver: zodResolver(LoginValidator),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onValid = async (formData: LoginRequest) => {
    if (errorMessage !== '') setErrorMessage('');
    setIsLoading(true);

    const { email, password } = formData;
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      const parsed = JSON.parse(response.error);
      setIsLoading(false);
      setErrorMessage(parsed.error);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className='w-full flex justify-center items-center border border-primary rounded-full text-accent-blue py-2 font-semibold'
      >
        Sign in
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
            Sign in to X
          </div>
          <form
            onSubmit={handleSubmit(onValid)}
            className='mt-10'
          >
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
              <div className='text-error text-sm pb-4 flex space-x-1 justify-center items-center font-semibold'>
                <Icons.exclamation className='h-4 w-4' />
                <span>{errorMessage}</span>
              </div>
            )}
            <button
              type='submit'
              className='mb-4 py-2 w-full bg-accent-blue text-white disabled:bg-secondary rounded-full outline-none'
              disabled={isLoading || !isValid}
            >
              {isLoading ? 'Loading' : 'Sign in'}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
