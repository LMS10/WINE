'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/auth';
import emptyData from '@/assets/icons/empty_review.svg';
import { MyReview, MyReviewResponse } from '@/types/review-data';
import { MyReviewItem } from './MyReviewItem';
import LoadingSpinner from '@/components/LoadingSpinner';

export interface EditReviewData {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  wineId: number;
}

export default function MyReviewListContainer({ setDataCount }: { setDataCount: (value: number) => void }) {
  const [myReviewData, setMyReviewData] = useState<MyReview[]>([]);
  const [isLoading, setIsloading] = useState(true);

  const getMyReview = useCallback(async () => {
    try {
      setIsloading(true);
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me/reviews?limit=30`);

      if (!response?.ok || response === null) {
        return;
      }

      const data: MyReviewResponse = await response.json();
      setMyReviewData(data.list);
      setDataCount(data.totalCount);
    } catch (error) {
      console.error('리뷰를 불러오는 중 문제가 발생했습니다:', error);
    } finally {
      setIsloading(false);
    }
  }, [setDataCount]);

  const deleteMyReview = (id: number) => {
    const updatedReviewList = myReviewData.filter((value) => value.id !== id);
    setMyReviewData(updatedReviewList);
  };

  const editMyReview = (id: number, editReviewData: EditReviewData, updatedAt: string) => {
    const updatedReviewList = myReviewData.map((value) => {
      if (value.id === id) {
        return { ...value, ...editReviewData, updatedAt: updatedAt };
      }
      return value;
    });
    setMyReviewData(updatedReviewList);
  };

  useEffect(() => {
    getMyReview();
  }, [getMyReview]);

  if (isLoading) return <LoadingSpinner className='flex h-[228px] w-[800px] rounded-[16px] border border-gray-300 tablet:w-full mobile:w-full' />;

  if (myReviewData.length === 0)
    return (
      <div className='flex h-[80vh] w-full flex-col items-center justify-center gap-[24px] pc:w-[800px] mobile:h-[40vh] mobile:gap-[12px]'>
        <Image className='h-[120px] w-[120px] mobile:h-[50px] mobile:w-[50px]' alt='데이터 없음' src={emptyData} priority />
        <p className='text-lg font-normal text-gray-500 mobile:text-md'>내가 등록한 후기가 없어요</p>
      </div>
    );

  return (
    <div className='flex flex-col gap-[8px] tablet:gap-[16px] mobile:gap-[16px]'>
      {myReviewData.map((value) => (
        <MyReviewItem key={value.id} reviewInitialData={value} editMyReview={editMyReview} deleteMyReview={deleteMyReview} />
      ))}
    </div>
  );
}
