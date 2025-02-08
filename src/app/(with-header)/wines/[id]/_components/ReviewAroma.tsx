import Image from 'next/image';
import { aromaTraslations } from '@/constants/aromaTranslation';

interface ReviewAromaProps {
  selectedAroma: string[];
  count: number;
}

export default function ReviewAroma({ selectedAroma, count }: ReviewAromaProps) {
  return (
    <div>
      <div className='mb-[40px] flex w-[540px] items-center justify-between'>
        <div className='text-xl font-bold'>어떤 향이 나나요?</div>
        <div className='text-md text-gray-500'>({count}명 참여)</div>
      </div>
      <div className='relative flex'>
        {selectedAroma.map((aroma, index) => {
          const imageSrc = `/aromas/${aroma.toLowerCase()}.svg`;
          const aromaName = aromaTraslations[aroma.toUpperCase()] || aroma;

          return (
            <div key={index} className='mr-[20px] flex h-[154px] w-[170px] flex-col items-center justify-center gap-[15px] rounded-2xl border border-gray-300 shadow-sm'>
              <Image src={imageSrc} alt={`Aroma ${aroma}`} width={45} height={45} />
              <span className='text-lg text-gray-500'>{aromaName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
