'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';

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
    <form>
      <div className='relative w-full h-full'>
        <input
          id='search'
          type='text'
          value={inputValue}
          onChange={onChange}
          ref={inputRef}
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
          <BsSearch className='w-4 h-4' />
        </label>
      </div>
    </form>
  );
};

export default InputBox;
