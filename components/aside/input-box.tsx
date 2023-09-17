'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { HeroIcon } from '@/components/ui/hero-icon';

const InputBox = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

  const onChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void =>
    setInputValue(value);

  const clearInputValue = (): void => {
    inputRef.current?.focus();
    setInputValue('');
  };

  return (
    <form className='sticky top-0 z-10 -my-3 bg-black py-3'>
      <label
        className='group flex items-center justify-between gap-4 rounded-full bg-search-background px-4 py-3
                    transition focus-within:bg-black focus-within:ring-2 focus-within:ring-search-close-background'
      >
        <HeroIcon
          className='h-5 w-5 text-secondary transition-colors group-focus-within:text-search-close-background'
          iconName='MagnifyingGlassIcon'
        />

        <input
          type='text'
          placeholder='Search Twitter'
          value={inputValue}
          onChange={onChange}
          ref={inputRef}
          className='flex-1 !bg-search-background outline-none placeholder:text-secondary'
        />
        <button
          onClick={clearInputValue}
          disabled={!inputValue}
          className={`scale-50 bg-search-close-background p-1 opacity-0 hover:brightness-90 ${
            inputValue && 'scale-100 opacity-100'
          }`}
        >
          <HeroIcon
            className='h-4 w-4 stroke-black'
            iconName='XMarkIcon'
          />
        </button>
      </label>
    </form>
  );
};

export default InputBox;
