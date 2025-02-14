'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';
import { Wine } from '@/types/wine';
import StaticRating from '@/components/StaticRating';

export default function RecommendWineCard({ id, image, name, avgRating }: Wine) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const handleClick = () => {
    if (!isLoggedIn) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    router.push(`/wines/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className='flex h-[185px] w-[232px] cursor-pointer justify-between gap-[28px] rounded-xl bg-white px-[30px] pt-6 mobile:h-[160px] mobile:w-[193px] mobile:gap-[25px] mobile:px-[25px]'
    >
      <div className='relative h-[161px] w-[44px] overflow-hidden mobile:h-[136px] mobile:w-[38px]'>
        <Image src={image} alt={name} sizes='10vw' fill className='absolute object-cover' />
      </div>
      <div className='flex flex-col gap-[5px] mobile:gap-0'>
        <p className='text-4xl font-extrabold text-gray-800 mobile:text-[28px]'>{avgRating.toFixed(1)}</p>
        <div className='mobile:hidden'>
          <StaticRating size='medium' value={avgRating} />
        </div>
        <div className='pc:hidden tablet:hidden mobile:block'>
          <StaticRating size='small' value={avgRating} />
        </div>
        <p className='w-[100px] text-[12px] leading-[18px] text-gray-500 mobile:w-[80px] mobile:text-[10px] mobile:leading-[14px]'>{name}</p>
      </div>
    </div>
  );
}
