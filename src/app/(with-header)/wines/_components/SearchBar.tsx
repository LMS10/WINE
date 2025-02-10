'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import searchIcon from '@/assets/icons/search.svg';

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export default function Searchbar({ onSearch }: SearchBarProps) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <div className='flex h-12 flex-1 items-center gap-[15px] rounded-[50px] border border-gray-300 px-5 text-2lg text-gray-400 mobile:h-[38px] mobile:gap-[10px] mobile:pl-[15px] mobile:pr-[17px] mobile:text-lg mobile:font-medium'>
      <Image src={searchIcon} alt='검색 아이콘' width={20} height={20} className='h-[20px] w-[20px]' />
      <input type='text' className='flex-1 text-gray-800 focus:outline-none' placeholder='와인을 검색해 보세요' value={search} onChange={onChangeSearch} />
    </div>
  );
}
