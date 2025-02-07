'use client';

import { useState } from 'react';

type WineFilterProps = {
  onChangeType: (type: string | null) => void;
};

export default function WineFilter({ onChangeType }: WineFilterProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleTypeClick = (type: string) => {
    const newType = selectedType === type ? null : type;
    setSelectedType(newType);
    onChangeType(newType);
  };

  return (
    <div className='flex flex-col gap-3'>
      <div className='text-xl font-bold text-gray-800'>WINE TYPES</div>
      <div className='flex gap-[15px]'>
        {['Red', 'White', 'Sparkling'].map((type) => (
          <button
            key={type}
            className={`rounded-full px-[18px] py-[10px] font-medium ${selectedType === type ? 'bg-purple-100 text-white' : 'border border-gray-300 bg-white text-gray-800'}`}
            onClick={() => handleTypeClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
