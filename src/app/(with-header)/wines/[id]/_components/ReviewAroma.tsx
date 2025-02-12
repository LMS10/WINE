import Image from 'next/image';
import { aromaTraslations } from '@/constants/aromaTranslation';

interface ReviewAromaProps {
  selectedAroma: string[];
  count: number;
}

export default function ReviewAroma({ selectedAroma, count }: ReviewAromaProps) {
  return (
    <div>
      <div className='mb-[40px] flex w-full items-center justify-between'>
        <div className='text-xl font-bold'>어떤 향이 나나요?</div>
        <div className='text-md text-gray-500'>({count}명 참여)</div>
      </div>
      <div className='relative flex w-full tablet:max-w-[1000px]'>
        {selectedAroma.map((aroma, index) => {
          const imageSrc = `/aromas/${aroma.toLowerCase()}.svg`;
          const aromaName = aromaTraslations[aroma.toUpperCase()] || aroma;

          return (
            <div
              key={index}
              className='mr-[22px] flex h-[154px] w-[170px] flex-col items-center justify-center gap-[15px] rounded-2xl border border-gray-300 shadow-sm last:mr-0 tablet:w-[400px] mobile:mr-[10px] mobile:h-[112px]'
            >
              <Image src={imageSrc} alt={`Aroma ${aroma}`} width={45} height={45} className='h-[45px] w-[45px] mobile:h-[30px] mobile:w-[30px]' />
              <span className='text-lg text-gray-500 mobile:text-md'>{aromaName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
