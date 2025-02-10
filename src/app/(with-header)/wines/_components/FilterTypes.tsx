type FilterTypesProps = {
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
};

const FilterTypes = ({ selectedType, onTypeChange }: FilterTypesProps) => {
  const handleTypeClick = (type: string) => {
    const newType = selectedType === type ? null : type;
    onTypeChange(newType);
  };

  return (
    <div>
      <div className='mb-3 text-xl font-bold text-gray-800'>WINE TYPES</div>
      <div className='flex gap-[15px]'>
        {['Red', 'White', 'Sparkling'].map((type) => (
          <button
            key={type}
            className={`rounded-[100px] px-[18px] py-[10px] text-lg font-medium ${selectedType === type ? 'border border-purple-100 bg-purple-100 text-white' : 'border border-gray-300 bg-white text-gray-800'}`}
            onClick={() => handleTypeClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTypes;
