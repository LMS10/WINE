'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import Image from 'next/image';
import { WineDetails } from '@/types/wine';
import SearchBar from './SearchBar';
import WineFilter from './WineFilter';
import WineFilterModal from './WineFilterModal';
import WineCard from './WineCard';
import PostWineModal from '@/components/modal/PostWineModal';
import filterIcon from '@/assets/icons/filter.svg';

const MAX_PRICE = 2000000;

export default function WineListContainer() {
  const { isLoggedIn } = useAuth();
  const [wines, setWines] = useState<WineDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<{ type: string | null; minPrice: number; maxPrice: number; rating: number | null }>({
    type: null,
    minPrice: 0,
    maxPrice: MAX_PRICE,
    rating: null,
  });
  const [isFilterModalOpen, setFilterModalOpen] = useState<boolean>(false);
  const [pendingFilters, setPendingFilters] = useState(filters);

  useEffect(() => {
    if (isFilterModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFilterModalOpen]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setFilterModalOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const applyFilters = () => {
    setFilters(pendingFilters);
    setFilterModalOpen(false);
  };

  useEffect(() => {
    const fetchWines = async () => {
      const params = new URLSearchParams();
      if (filters.type) params.append('type', filters.type.toUpperCase());
      if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
      if (filters.rating) params.append('rating', filters.rating.toString());
      if (searchQuery) params.append('name', searchQuery);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wines?limit=20&${params.toString()}`);

      if (!res.ok) {
        console.error('Failed to fetch wines');
        return;
      }

      const data = await res.json();
      setWines(data.list);
    };

    fetchWines();
  }, [filters, searchQuery]);

  return (
    <div className='mt-10 grid grid-cols-[284px,1fr] grid-rows-[48px,1fr] gap-x-[60px] gap-y-[62px] tablet:flex tablet:flex-col mobile:mt-5 mobile:gap-[30px]'>
      <div className='hidden pc:block' />
      <div className='hidden pc:block'>
        <SearchBar onSearch={setSearchQuery} />
      </div>
      <div className='hidden pc:block'>
        <WineFilter onChangeFilter={setFilters} />
        {isLoggedIn && (
          <div className='mt-[60px]'>
            <PostWineModal />
          </div>
        )}
      </div>
      <div className='flex w-full items-center justify-between pc:hidden'>
        <button className='mr-6 flex h-12 w-12 items-center justify-center rounded-lg border border-gray-300' onClick={() => setFilterModalOpen(true)}>
          <Image src={filterIcon} alt='와인 필터 아이콘' width={26} height={26} />
        </button>
        <SearchBar onSearch={setSearchQuery} />
        {isLoggedIn && (
          <div className='ml-4 mobile:hidden'>
            <PostWineModal />
          </div>
        )}
        {isLoggedIn && (
          <div className='fixed bottom-[35px] left-1/2 z-50 w-[calc(100vw-40px)] max-w-[700px] -translate-x-1/2 justify-center rounded-xl py-3 text-lg tablet:hidden mobile:block'>
            <PostWineModal />
          </div>
        )}
      </div>
      <WineFilterModal isOpen={isFilterModalOpen} onClose={() => setFilterModalOpen(false)} onApply={applyFilters} initialFilters={pendingFilters} onFilterChange={setPendingFilters} />
      <div className='flex flex-1 flex-col gap-[62px]'>
        {wines.map((wine) => (
          <WineCard key={wine.id} wine={wine} />
        ))}
      </div>
    </div>
  );
}
