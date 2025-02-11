'use client';

import { useState } from 'react';
import FilterTypes from './FilterTypes';
import FilterPrice from './FilterPrice';
import FilterRating from './FilterRating';

const MAX_PRICE = 2000000;

type WineFilterProps = {
  onChangeFilter: (filters: { type: string | null; minPrice: number; maxPrice: number; rating: number | null }) => void;
};

export default function WineFilter({ onChangeFilter }: WineFilterProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleTypeChange = (newType: string | null) => {
    setSelectedType(newType);
    onChangeFilter({ type: newType, minPrice: priceRange[0], maxPrice: priceRange[1], rating: selectedRating });
  };

  const handlePriceChange = (values: number[]) => {
    const [minPrice, maxPrice] = values;
    setPriceRange([minPrice, maxPrice]);
    onChangeFilter({ type: selectedType, minPrice, maxPrice, rating: selectedRating });
  };

  const handleRatingChange = (rating: number | null) => {
    setSelectedRating(rating);
    onChangeFilter({ type: selectedType, minPrice: priceRange[0], maxPrice: priceRange[1], rating });
  };

  return (
    <div className='flex flex-col gap-[56px]'>
      <FilterTypes selectedType={selectedType} onTypeChange={handleTypeChange} />
      <FilterPrice priceRange={priceRange} onPriceChange={handlePriceChange} />
      <FilterRating selectedRating={selectedRating} onRatingChange={handleRatingChange} />
    </div>
  );
}
