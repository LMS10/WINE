'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';
import { WineDetails } from '@/types/wine';
import StaticRating from '@/components/StaticRating';
import rightArrow from '@/assets/icons/right_arrow.svg';

type WineCardProps = {
  wine: WineDetails;
};

export default function WineCard({ wine }: WineCardProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const handleClick = () => {
    if (!isLoggedIn) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    router.push(`/wines/${wine.id}`);
  };

  return (
    <div onClick={handleClick} className='cursor-pointer rounded-2xl border border-gray-300 hover:shadow-lg'>
      <div className='flex justify-between gap-[81px] tablet:gap-[47px] mobile:gap-9'>
        <div className='relative ml-[60px] mt-10 h-[208px] w-[60px] overflow-hidden tablet:ml-10 mobile:ml-5'>
          <Image src={wine.image} alt={wine.name} sizes='30vw' fill className='absolute object-cover' />
        </div>

        <div className='mb-[24px] mr-[50px] mt-[36px] flex flex-1 flex-col justify-between gap-4 mobile:mb-[28px] mobile:mr-[30px] mobile:mt-[30px]'>
          <div className='flex justify-between tablet:gap-3 mobile:flex-col mobile:gap-[22px]'>
            <div className='flex flex-col items-start justify-between'>
              <p className='line-clamp-2 text-ellipsis text-3xl font-semibold text-gray-800 pc:w-[390px] tablet:max-w-[600px] mobile:w-auto mobile:text-xl'>{wine.name}</p>
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
                  <p className='mt-[10px] line-clamp-2 max-w-[120px] text-ellipsis text-md text-gray-500 mobile:mt-[3px]'>{wine.reviewCount}개의 후기</p>
                </div>
              </div>
              <Image src={rightArrow} alt='와인 상세보기' width={36} height={36} className='pc:self-end tablet:self-end mobile:h-[32px] mobile:w-[32px] mobile:self-auto' />
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-[10px] border-t-[1px] border-t-gray-300 px-[60px] py-5 tablet:px-10 mobile:gap-2 mobile:px-6 mobile:py-3'>
        <p className='text-lg font-semibold text-gray-800 mobile:text-md'>최신 후기</p>
        <p className='line-clamp-2 h-[26px] overflow-hidden text-ellipsis text-lg text-gray-500 mobile:text-md'>{wine.recentReview?.content || '아직 후기가 없습니다.'}</p>
      </div>
    </div>
  );
}
