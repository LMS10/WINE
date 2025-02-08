'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { WineDetails } from '@/types/wine';
import SearchBar from './SearchBar';
import WineFilter from './WineFilter';
import WineCard from './WineCard';
import filterIcon from '@/assets/icons/filter.svg';

export default function WineListContainer() {
  const [wines, setWines] = useState<WineDetails[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterModalOpen, setFilterModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchWines = async () => {
      const params = new URLSearchParams();
      if (selectedType) params.append('type', selectedType.toUpperCase());
      if (searchQuery) params.append('name', searchQuery);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wines?limit=10&${params.toString()}`, {
        cache: 'force-cache',
      });

      if (!res.ok) {
        console.error('Failed to fetch wines');
        return;
      }

      const data = await res.json();
      setWines(data.list);
    };

    fetchWines();
  }, [selectedType, searchQuery]);

  const handleFilterButtonClick = () => {
    setFilterModalOpen(!isFilterModalOpen);
  };

  return (
    <div className='mt-10 grid grid-cols-[284px,1fr] grid-rows-[48px,1fr] gap-x-[60px] gap-y-[62px] tablet:flex tablet:flex-col mobile:mt-5 mobile:gap-[30px]'>
      <div className='hidden pc:block' />

      <div className='hidden pc:block'>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <div className='hidden pc:block'>
        <WineFilter onChangeType={setSelectedType} />
      </div>

      <div className='flex w-full items-center justify-between pc:hidden'>
        <button className='mr-6 flex h-12 w-12 items-center justify-center rounded-lg border border-gray-300 mobile:mr-4 mobile:h-[38px] mobile:w-[38px]' onClick={handleFilterButtonClick}>
          <Image src={filterIcon} alt='와인 필터 아이콘' className='h-[26px] w-[26px] mobile:h-[22px] mobile:w-[22px]' />
        </button>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {isFilterModalOpen && (
        <div className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50'>
          <div className='rounded-md bg-white p-6'>
            <WineFilter onChangeType={setSelectedType} />
            <button className='mt-4 rounded-full bg-red-500 px-4 py-2 text-white' onClick={() => setFilterModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className='flex flex-1 flex-col gap-[62px] mobile:gap-5'>
        {wines.map((wine) => (
          <WineCard key={wine.id} wine={wine} />
        ))}
      </div>
    </div>
  );
}
