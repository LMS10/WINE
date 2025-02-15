'use client';
import { ReviewData } from '@/types/review-data';
import WineCard from '@/components/WineCard';

export default function WineContainer({ wine }: { wine: ReviewData }) {
  return (
    <div className='mt-[62px] w-full mobile:mt-[29px]'>
      <div className='mx-auto w-full max-w-[1140px] tablet:w-[calc(100%-45px)] tablet:max-w-[1000px] mobile:max-w-[700px]'>{wine ? <WineCard {...wine} size='large' /> : ''}</div>
    </div>
  );
}
