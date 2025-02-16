'use client';

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import FilterTypes from './FilterTypes';
import FilterPrice from './FilterPrice';
import FilterRating from './FilterRating';
import Button from '@/components/Button';
import closeIcon from '@/assets/icons/close.svg';

const MAX_PRICE = 2000000;

type WineFilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: { type: string | null; minPrice: number; maxPrice: number; rating: number | null }) => void;
  onFilterChange: (filters: { type: string | null; minPrice: number; maxPrice: number; rating: number | null }) => void;
  initialFilters: { type: string | null; minPrice: number; maxPrice: number; rating: number | null };
};

export default function WineFilterModal({ isOpen, onClose, onApply, onFilterChange, initialFilters }: WineFilterModalProps) {
  const [selectedType, setSelectedType] = useState<string | null>(initialFilters.type);
  const [priceRange, setPriceRange] = useState<[number, number]>([initialFilters.minPrice, initialFilters.maxPrice]);
  const [selectedRating, setSelectedRating] = useState<number | null>(initialFilters.rating);

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const handleFinalPriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const handleFilterApply = () => {
    onApply({ type: selectedType, minPrice: priceRange[0], maxPrice: priceRange[1], rating: selectedRating });
    onClose();
  };

  const handleReset = () => {
    setSelectedType(null);
    setPriceRange([0, MAX_PRICE]);
    setSelectedRating(null);
  };

  useEffect(() => {
    onFilterChange({ type: selectedType, minPrice: priceRange[0], maxPrice: priceRange[1], rating: selectedRating });
  }, [selectedType, priceRange, selectedRating, onFilterChange]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30' onClick={onClose}>
      <div
        className={`relative rounded-2xl bg-white px-[34px] py-6 transition-transform ${
          isOpen ? 'mobile:translate-y-0 mobile:animate-slide-up' : 'mobile:animate-slide-down mobile:translate-y-full'
        } mobile:fixed mobile:inset-x-0 mobile:bottom-0 mobile:rounded-b-none mobile:rounded-t-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='mb-8 flex flex-row justify-between'>
          <p className='text-xl font-bold text-gray-800'>필터</p>
          <Image src={closeIcon} alt='닫기 아이콘' width={24} height={24} className='h-6 w-6 cursor-pointer' onClick={onClose} />
        </div>

        <div className='flex flex-col gap-[56px]'>
          <FilterTypes selectedType={selectedType} onTypeChange={setSelectedType} />
          <FilterPrice priceRange={priceRange} onPriceChange={handlePriceChange} onFinalChange={handleFinalPriceChange} />
          <FilterRating selectedRating={selectedRating} onRatingChange={setSelectedRating} />
        </div>

        <div className='mt-10 flex gap-[8px]'>
          <Button text='초기화' variant='lightPurple' onClick={handleReset} className='' />
          <Button text='필터 적용하기' className='flex-1 rounded-xl py-[16px] text-lg tablet:px-[68px] mobile:px-0' onClick={handleFilterApply} />
        </div>
      </div>
    </div>
  );
}
