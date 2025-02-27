'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import emptyData from '@/assets/icons/empty_review.svg';
import { MyReview } from '@/types/review-data';
import MyReviewItem from '@/app/(with-header)/myprofile/_components/MyReviewItem';
import Refresh from '@/components/Refresh';
import { fetchMyReview } from '@/lib/fetchMyReivew';
import MyReviewItemSkeleton from './skeleton/MyReviewItemSkeleton';
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

export default function MyReviewListContainer({ setDataCount }: { setDataCount: React.Dispatch<React.SetStateAction<number>> }) {
  const [myReviewData, setMyReviewData] = useState<MyReview[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState('');
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const lastReviewRef = useRef<HTMLDivElement | null>(null);

  const getMyReview = useCallback(async () => {
    setError('');
    setIsloading(true);
    try {
      const data = await fetchMyReview(5);
      setMyReviewData(data.list);
      setDataCount(data.totalCount);
      setNextCursor(data.nextCursor);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsloading(false);
    }
  }, [setDataCount]);

  const getMoreMyReview = useCallback(async () => {
    if (nextCursor === null) return;
    setError('');
    setIsMoreLoading(true);
    try {
      const data = await fetchMyReview(5, nextCursor || undefined);
      setMyReviewData((prev) => [...prev, ...data.list]);
      setDataCount(data.totalCount);
      setNextCursor(data.nextCursor);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsMoreLoading(false);
    }
  }, [setDataCount, nextCursor]);

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

  useEffect(() => {
    if (!lastReviewRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          getMoreMyReview();
        }
      },
      {
        root: null,
        threshold: 0.5,
      },
    );
    observer.observe(lastReviewRef.current);
    return () => observer.disconnect();
  }, [getMoreMyReview]);

  if (isLoading)
    return (
      <div className='flex flex-col gap-[8px] tablet:gap-[16px] mobile:gap-[16px]'>
        {[...Array(3)].map((_, index) => (
          <MyReviewItemSkeleton key={index} />
        ))}
      </div>
    );

  if (error)
    return (
      <Refresh
        handleLoad={getMyReview}
        boxStyle='flex h-[228px] w-[800px] rounded-[16px] border border-gray-300 tablet:w-full mobile:w-full gap-[10px]'
        buttonStyle='px-[20px] py-[8px]'
        iconSize='w-[50px] h-[50px] mobile:w-[40px] mobile:h-[40px]'
        iconTextGap='gap-[10px]'
      />
    );

  if (myReviewData.length === 0)
    return (
      <div className='flex h-[80vh] w-full flex-col items-center justify-center gap-[24px] pc:w-[800px] mobile:h-[40vh] mobile:gap-[12px]'>
        <Image className='h-[120px] w-[120px] mobile:h-[50px] mobile:w-[50px]' alt='데이터 없음' src={emptyData} priority />
        <p className='text-lg font-normal text-gray-500 mobile:text-md'>내가 등록한 후기가 없어요</p>
      </div>
    );

  return (
    <div className='scrollbar-hidden flex h-[75vh] flex-col gap-[8px] overflow-x-hidden overflow-y-scroll tablet:gap-[16px] mobile:gap-[16px]'>
      {myReviewData.map((value, index) => (
        <MyReviewItem
          key={value.id}
          reviewInitialData={value}
          editMyReview={editMyReview}
          deleteMyReview={deleteMyReview}
          setDataCount={setDataCount}
          ref={index === myReviewData.length - 1 ? lastReviewRef : null}
        />
      ))}
      {isMoreLoading && <LoadingSpinner />}
    </div>
  );
}
