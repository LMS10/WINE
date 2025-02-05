'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Wine } from '@/types/wine';
import rightArrow from '@/assets/icons/right_arrow.svg';
import StaticRating from '@/components/StaticRating';

type WineCardProps = {
  wine: Wine;
};

export default function WineCard({ wine }: WineCardProps) {
  return (
    <Link href={`/wines/${wine.id}`} className='rounded-2xl border border-gray-300 hover:shadow-lg'>
      <div className='flex justify-between gap-[81px] tablet:gap-[47px] mobile:gap-5'>
        <div className='ml-[60px] mt-10 w-[60px] overflow-y-hidden tablet:ml-10 tablet:w-[74px] mobile:ml-5 mobile:mt-0'>
          <div className='relative bottom-[-20px] h-full w-full'>
            <Image src={wine.image} alt={wine.name} fill className='object-cover' sizes='150px' />
          </div>
        </div>
        <div className='mb-[24px] mr-[50px] mt-[36px] flex flex-1 flex-col justify-between gap-4 mobile:mb-[28px] mobile:mr-[30px] mobile:mt-[30px]'>
          <div className='flex justify-between tablet:gap-3 mobile:flex-col mobile:gap-[22px]'>
            <div className='flex flex-col items-start justify-between'>
              <p className='line-clamp-2 text-ellipsis text-3xl font-semibold text-gray-800 pc:w-[500px] tablet:w-[400px] mobile:w-auto mobile:text-xl'>{wine.name}</p>
              <p className='mb-4 mt-5 text-lg text-gray-500 mobile:mb-2 mobile:mt-0 mobile:text-md'>{wine.region}</p>
              <span className='rounded-xl bg-purple-10 px-[15px] py-2 text-2lg font-bold text-purple-100 mobile:rounded-[10px] mobile:px-[10px] mobile:py-[6px] mobile:text-md'>
                ₩ {wine.price.toLocaleString()}
              </span>
            </div>
            <div className='flex flex-col justify-between gap-1 mobile:mr-2 mobile:flex-row mobile:items-center mobile:gap-0'>
              <div className='mobile:mr-1 mobile:flex mobile:flex-1 mobile:items-center mobile:gap-[15px]'>
                <p className='mb-[10px] text-5xl font-extrabold text-gray-800 mobile:mb-0 mobile:text-3xl mobile:leading-8'>{wine.avgRating.toFixed(1)}</p>
                <div className='flex-col mobile:flex'>
                  <StaticRating value={wine.avgRating} />
                  <p className='mt-[10px] line-clamp-2 text-ellipsis text-md text-gray-500 mobile:mt-[3px]'>{wine.reviewCount}개의 후기</p>
                </div>
              </div>
              <Image src={rightArrow} alt='와인 상세보기' width={36} height={36} className='pc:self-end tablet:self-end mobile:h-[32px] mobile:w-[32px] mobile:self-auto' />
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-[10px] border-t-[1px] border-t-gray-300 px-[60px] py-5 tablet:px-10 mobile:gap-2 mobile:px-6 mobile:py-3'>
        <p className='text-lg font-semibold text-gray-800 mobile:text-md'>최신 후기</p>
        <p className='text-lg text-gray-500 mobile:text-md'>{wine.recentReview?.content || '아직 후기가 없습니다.'}</p>
      </div>
    </Link>
  );
}
