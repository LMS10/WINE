type FilterRatingProps = {
  selectedRating: number | null;
  onRatingChange: (rating: number | null) => void;
};

const FilterRating = ({ selectedRating, onRatingChange }: FilterRatingProps) => {
  return (
    <div>
      <div className='mb-[10px] text-xl font-bold text-gray-800'>RATING</div>
      <div className='flex flex-col gap-[10px] font-medium text-gray-800'>
        {[
          { label: '전체', value: null },
          { label: '4.5 - 5.0', value: 5.0 },
          { label: '4.0 - 4.5', value: 4.5 },
          { label: '3.5 - 4.0', value: 4.0 },
          { label: '3.0 - 3.5', value: 3.5 },
        ].map((item) => (
          <label key={item.value} className='peer flex cursor-pointer items-center gap-[15px]'>
            <div className='flex h-[20px] w-[20px] items-center justify-center rounded-[6px] border border-gray-300 bg-gray-100'>
              <input type='radio' name='rating' className='peer hidden' checked={selectedRating === item.value} onChange={() => onRatingChange(item.value)} />
              <div className='hidden h-[10px] w-[10px] rounded-[3px] bg-purple-100 peer-checked:block'></div>
            </div>
            <span className={selectedRating === item.value ? 'text-purple-100' : ''}>{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterRating;
