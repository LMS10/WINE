import { Range } from 'react-range';

const MAX_PRICE = 2000000;

type FilterPriceProps = {
  priceRange: [number, number];
  onPriceChange: (values: number[]) => void;
  onFinalChange: (values: number[]) => void;
};

const FilterPrice = ({ priceRange, onPriceChange, onFinalChange }: FilterPriceProps) => {
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
          onFinalChange={onFinalChange}
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
          renderThumb={({ props, index }) => {
            return (
              <div {...props} key={index} className='relative z-10 h-5 w-5 -translate-y-1/2 rounded-full border border-gray-300 bg-white shadow-md focus:outline-none'>
                <div
                  className={`absolute inset-[-9px] -z-10 rounded-full bg-purple-100 opacity-0 transition-transform duration-300 ease-out hover:scale-100 hover:opacity-10 focus-visible:scale-100 focus-visible:opacity-10`}
                />
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default FilterPrice;
