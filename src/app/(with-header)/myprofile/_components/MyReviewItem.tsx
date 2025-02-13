'use client';

import elapsedTime from '@/utils/formatDate';
import like from '@/assets/icons/star_hover.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import MyReviewKebabDropDown from './MyReviewKebabDropDown';

interface MyReviewProps {
  wineId: number;
  id: number;
  rating: number;
  createdAt: string;
  wineName: string;
  content: string;
}

export function MyReviewItem({ wineId, id, rating, createdAt, wineName, content }: MyReviewProps) {
  const router = useRouter();
  const reviewElapsedTime = elapsedTime(createdAt);

  const onClickReviewItem = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest('.ignore-click')) {
      event.stopPropagation();
      return;
    }
    router.push(`/wines/${wineId}`);
  };

  return (
    <div className='flex w-[800px] cursor-pointer rounded-[16px] border border-gray-300 px-10 py-7 hover:shadow-lg tablet:w-full mobile:w-full' onClick={onClickReviewItem}>
      <div className='flex flex-grow flex-col gap-[20px]'>
        <div className='relative flex gap-[15px]'>
          <div className='flex h-[42px] w-[80px] items-center justify-center gap-[4px] rounded-[12px] bg-purple-10 tablet:h-[38px] mobile:h-[32px] mobile:w-[60px]'>
            <Image className='w-[20px] mobile:w-[16px]' src={like} alt='별점 아이콘' />
            <span className='text-2lg font-bold text-purple-100 mobile:text-md'>{rating.toFixed(1)}</span>
          </div>
          <MyReviewKebabDropDown id={id} wineName={wineName} />
          <span className='flex items-center justify-center text-lg text-gray-500 mobile:text-md'>{reviewElapsedTime}</span>
        </div>
        <div className='flex flex-col gap-[10px]'>
          <h3 className='text-lg font-medium text-gray-500 mobile:text-md'>{wineName}</h3>
          <p className='text-lg font-normal text-gray-800 mobile:text-md'>{content}</p>
        </div>
      </div>
    </div>
  );
}
