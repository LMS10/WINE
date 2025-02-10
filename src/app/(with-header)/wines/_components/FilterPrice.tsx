import { Range } from 'react-range';

const MAX_PRICE = 2000000;

type FilterPriceProps = {
  priceRange: [number, number];
  onPriceChange: (values: number[]) => void;
};

const FilterPrice = ({ priceRange, onPriceChange }: FilterPriceProps) => {
  return (
    <div>
      <div className='mb-5 text-xl font-bold text-gray-800'>PRICE</div>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between text-lg font-medium text-purple-100'>
          <span>₩ {priceRange[0].toLocaleString()}</span>
          <span>₩ {priceRange[1].toLocaleString()}</span>
        </div>

        <Range
          step={10000}
          min={0}
          max={MAX_PRICE}
          values={priceRange}
          onChange={onPriceChange}
          renderTrack={({ props, children }) => (
            <div {...props} className='relative h-[6px] w-full rounded-full bg-gray-100'>
              <div
                className='absolute top-0 h-[6px] rounded-full bg-purple-100'
                style={{
                  left: `${(priceRange[0] / MAX_PRICE) * 100}%`,
                  width: `${((priceRange[1] - priceRange[0]) / MAX_PRICE) * 100}%`,
                }}
              />
              {children}
            </div>
          )}
          renderThumb={({ props, index }) => <div {...props} key={index} className='absolute h-5 w-5 -translate-y-1/2 rounded-full border border-gray-300 bg-white' />}
        />
      </div>
    </div>
  );
};

export default FilterPrice;
