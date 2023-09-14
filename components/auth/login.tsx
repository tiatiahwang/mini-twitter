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

const Login = () => {
  const router = useRouter();
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
    <form
      onSubmit={handleSubmit(onValid)}
      className='space-y-8 mt-8'
    >
      <div>
        <div className='mb-4 space-y-1'>
          <label
            htmlFor='email'
            className='text-sm text-gray-700/50'
          >
            Email
          </label>
          <input
            {...register('email')}
            id='email'
            type='email'
            className={`w-full bg-transparent border rounded-lg p-2 outline-none ${
              errors?.email
                ? 'border-red-500'
                : 'focus:border-main'
            }`}
            aria-invalid={Boolean(errors.email)}
          />
          {errors?.email?.message && (
            <span className='text-red-500 text-sm'>
              {errors.email.message}
            </span>
          )}
        </div>
        <div className='mb-4 space-y-1'>
          <label
            htmlFor='password'
            className='text-sm text-gray-700/50'
          >
            Password
          </label>
          <div className='flex items-center border rounded-lg p-2'>
            <input
              {...register('password')}
              id='password'
              type={showPassword ? 'text' : 'password'}
              className={`w-full bg-transparent outline-none ${
                errors?.password
                  ? 'border-red-500'
                  : 'focus:border-main'
              }`}
              aria-invalid={Boolean(errors.password)}
            />
            {showPassword ? (
              <Icons.show
                className='w-4 h-4 text-gray-400 cursor-pointer'
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
              />
            ) : (
              <Icons.hide
                className='w-4 h-4 text-gray-400 cursor-pointer'
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
      {errorMessage && (
        <div className='text-red-500 text-sm flex space-x-1 justify-center items-center font-bold'>
          <Icons.exclamation className='h-4 w-4 text-red-500' />
          <span>{errorMessage}</span>
        </div>
      )}
      <button
        className='py-2 w-full bg-indigo-400 text-white disabled:bg-gray-200 rounded-md'
        disabled={isLoading || !isValid}
      >
        Login
      </button>
    </form>
  );
};

export default Login;
