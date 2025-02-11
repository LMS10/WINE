'use client';

import Image from 'next/image';
import elapsedTime from '@/utils/formatDate';
import like from '@/assets/icons/star_hover.svg';
import { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/auth';
import emptyData from '@/assets/icons/empty_review.svg';
import { MyReview, MyReviewResponse } from '@/types/review-data';
import KebabDropDown from './KebabDropDown';

interface MyReviewProps {
  id: number;
  rating: number;
  createdAt: string;
  wineName: string;
  content: string;
}

export function MyReviewItem({ id, rating, createdAt, wineName, content }: MyReviewProps) {
  const reviewElapsedTime = elapsedTime(createdAt);

  return (
    <div className='flex max-w-[800px] rounded-[16px] border border-gray-300 px-10 py-7'>
      <div className='flex flex-grow flex-col gap-[20px]'>
        <div className='relative flex gap-[15px]'>
          <div className='flex h-[42px] w-[80px] items-center justify-center gap-[4px] rounded-[12px] bg-purple-10 tablet:h-[38px] mobile:h-[32px] mobile:w-[60px]'>
            <Image className='w-[20px] mobile:w-[16px]' src={like} alt='별점 아이콘' />
            <span className='text-[18px] font-bold text-purple-100 mobile:text-[14px]'>{rating.toFixed(1)}</span>
          </div>
          <KebabDropDown id={id} />
          <span className='flex items-center justify-center text-[16px] text-gray-500 mobile:text-[14px]'>{reviewElapsedTime}</span>
        </div>
        <div className='flex flex-col gap-[10px]'>
          <h3 className='text-[16px] font-medium text-gray-500 mobile:text-[14px]'>{wineName}</h3>
          <p className='text-[16px] font-normal text-gray-800 mobile:text-[14px]'>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default function MyReviewListContainer() {
  const [myReviewData, setMyReviewData] = useState<MyReview[]>([]);
  const [isLoading, setIsloading] = useState(true);

  const getMyReview = async () => {
    try {
      setIsloading(true);
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me/reviews?limit=30`);

      if (!response?.ok || response === null) {
        return;
      }

      const data: MyReviewResponse = await response.json();
      setMyReviewData(data.list);
    } catch (error) {
      console.error('데이터를 불러오는데 오류가 발생했습니다:', error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    getMyReview();
  }, []);

  if (isLoading) return <div>로딩중...</div>;

  if (myReviewData.length === 0)
    return (
      <div className='flex h-[80vh] max-w-[800px] flex-col items-center justify-center gap-[24px] mobile:h-[40vh] mobile:gap-[12px]'>
        <Image className='h-[120px] w-[120px] mobile:h-[50px] mobile:w-[50px]' alt='데이터 없음' src={emptyData} priority />
        <p className='text-lg font-normal text-gray-500 mobile:text-md'>내가 등록한 후기가 없어요</p>
      </div>
    );

  return (
    <div className='flex flex-col gap-[8px] tablet:gap-[16px] mobile:gap-[16px]'>
      {myReviewData.map((value) => (
        <MyReviewItem key={value.id} rating={value.rating} createdAt={value.createdAt} wineName={value.wine.name} content={value.content} id={value.id} />
      ))}
    </div>
  );
}
