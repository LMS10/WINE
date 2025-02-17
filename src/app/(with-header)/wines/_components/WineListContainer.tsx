'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import Image from 'next/image';
import { fetchWines } from '@/lib/fetchWines';
import { WineDetails } from '@/types/wine';
import SearchBar from './SearchBar';
import WineFilter from './WineFilter';
import WineFilterModal from './WineFilterModal';
import WineCard from './WineCard';
import PostWineModal from '@/components/modal/PostWineModal';
import Refresh from '@/components/Refresh';
import WineListSkeleton from './skeleton/WineListSkeleton';
import LoadingSpinner from '@/components/LoadingSpinner';
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
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const lastWineRef = useRef<HTMLDivElement | null>(null);

  const loadMoreWines = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const response = await fetchWines({
        limit: 8,
        cursor: nextCursor ?? undefined,
        type: filters.type ?? undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        rating: filters.rating ?? undefined,
        name: searchQuery || undefined,
      });
      setWines((prev) => [...prev, ...response.list]);
      setNextCursor(response.nextCursor);
      setHasMore(response.nextCursor !== null);
      setHasError(false);
    } catch (error) {
      setHasError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsInitialLoading(false);
    }
  }, [isLoading, hasMore, nextCursor, filters, searchQuery]);

  useEffect(() => {
    setWines([]);
    setNextCursor(null);
    setHasMore(true);
    setIsInitialLoading(true);
  }, [filters, searchQuery]);

  useEffect(() => {
    if (isInitialLoading) {
      loadMoreWines();
    }
  }, [isInitialLoading, loadMoreWines]);

  useEffect(() => {
    if (!hasMore || !lastWineRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreWines();
        }
      },
      {
        root: null,
        threshold: 0.5,
      },
    );
    observer.observe(lastWineRef.current);
    return () => observer.disconnect();
  }, [loadMoreWines, hasMore]);

  useEffect(() => {
    setWines([]);
    setNextCursor(null);
    setHasMore(true);
  }, [filters, searchQuery]);

  useEffect(() => {
    if (wines.length === 0 && hasMore) {
      loadMoreWines();
    }
  }, [wines, hasMore, loadMoreWines]);

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
      <div className='flex min-h-0 flex-col'>
        <div className='scrollbar-hidden flex h-[650px] max-h-screen flex-col gap-[62px] tablet:h-[550px]'>
          {hasError && (
            <div className='pc:mt-28 tablet:mt-20 mobile:mt-10'>
              <Refresh
                handleLoad={loadMoreWines}
                buttonStyle='px-[20px] py-[8px] mobile:px-[16px] mobile:py-[6px] mobile:text-md mobile:font-semibold'
                iconSize='w-[100px] h-[100px] mobile:w-[60px] mobile:h-[60px]'
                iconTextGap='gap-[10px]'
              />
            </div>
          )}
          {isInitialLoading ? (
            <WineListSkeleton count={2} />
          ) : (
            <>
              {wines.map((wine, index) => (
                <WineCard key={`${wine.id}-${index}`} ref={index === wines.length - 1 ? lastWineRef : null} wine={wine} />
              ))}
              {isLoading && <LoadingSpinner className='mt-[-30px]' />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
